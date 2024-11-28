import { useState, useCallback, useRef } from 'react';
import { cacheService } from '../services/cacheService';
import axios from 'axios';
import { getApolloClient } from '@faustwp/core';

function decodeHTMLEntities(text: string): string {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = text;
    return textarea.value;
}

interface UseSearchOptions {
    minLength?: number;
    debounceMs?: number;
}

export interface Category {
    id: number;
    name: string;
    slug: string;
}

export const useSearch = (options: UseSearchOptions = {}) => {
    const {
        minLength = 2,
        debounceMs = 500
    } = options;

    const [searchValue, setSearchValue] = useState('');
    const [results, setResults] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const debounceTimer = useRef<NodeJS.Timeout>();
    const lastSearchTime = useRef<number>(Date.now());
    const pendingSearch = useRef<string | null>(null);
    const client = getApolloClient()

    const performSearch = useCallback(async (term: string) => {
        const now = Date.now();
        const timeSinceLastSearch = now - lastSearchTime.current;

        if (timeSinceLastSearch < 800) {
            pendingSearch.current = term;
            return;
        }

        if (cacheService.shouldSkipAPICall(term)) {
            setResults([]);
            return;
        }

        setIsLoading(true);
        setError(null);


        try {
            const cachedResults = cacheService.searchInCache(term);
            if (cachedResults !== null) {
                setResults(cachedResults);
                setIsLoading(false);
                return;
            }

            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/custom/v1/search-categories`,
                {
                    params: {
                        keyword: term,
                    }
                }
            )

            const categories = response.data.status === 'success'
                ? response.data.categories.map((category: Category) => ({
                    ...category,
                    name: decodeHTMLEntities(category.name)
                }))
                : [];

            cacheService.updateCache(term, categories);
            setResults(categories);
            lastSearchTime.current = now;

            if (pendingSearch.current && pendingSearch.current !== term) {
                const nextSearch = pendingSearch.current;
                pendingSearch.current = null;
                performSearch(nextSearch);
            }
        } catch (err) {
            setError('No results found');
            cacheService.updateCache(term, []);
            setResults([]);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const search = useCallback(async (term: string) => {
        if (term.length < minLength) {
            setResults([]);
            return;
        }

        const cachedResults = cacheService.searchInCache(term);
        if (cachedResults !== null) {
            setResults(cachedResults);
            return;
        }

        await performSearch(term);
    }, [minLength, performSearch]);

    const handleSearch = useCallback((term: string) => {
        setSearchValue(term);

        if (debounceTimer.current) {
            clearTimeout(debounceTimer.current);
        }

        debounceTimer.current = setTimeout(() => {
            search(term);
        }, debounceMs);
    }, [search, debounceMs]);

    return {
        searchValue,
        results,
        isLoading,
        error,
        handleSearch
    };
};
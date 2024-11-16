const CACHE_KEY = 'category_search_cache';
const METRICS_KEY = 'search_metrics';
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour
const MAX_CACHE_ITEMS = 100;
const MIN_SEARCH_LENGTH = 2;

class CacheService {
  private cache: any = {};
  private metrics: any = {};
  private emptyPrefixes: Set<string> = new Set();

  private isClient(): boolean {
    return typeof window !== 'undefined';
  }

  private getLocalStorage(): Storage | null {
    if (this.isClient()) {
      try {
        return window.localStorage;
      } catch (e) {
        console.warn('localStorage not available:', e);
        return null;
      }
    }
    return null;
  }

  constructor() {
    if (this.isClient()) {
      this.loadCache();
      this.loadMetrics();
    }
  }

  private loadCache(): void {
    const storage = this.getLocalStorage();
    if (!storage) return;

    try {
      const savedCache = storage.getItem(CACHE_KEY);
      if (savedCache) {
        this.cache = JSON.parse(savedCache);
        this.cleanCache();
      }
    } catch (error) {
      console.error('Error loading cache:', error);
      this.cache = {};
    }
  }

  private loadMetrics(): void {
    const storage = this.getLocalStorage();
    if (!storage) return;

    try {
      const savedMetrics = storage.getItem(METRICS_KEY);
      if (savedMetrics) {
        this.metrics = JSON.parse(savedMetrics);
      }
    } catch (error) {
      console.error('Error loading metrics:', error);
      this.metrics = {};
    }
  }

  private saveCache(): void {
    const storage = this.getLocalStorage();
    if (!storage) return;

    try {
      storage.setItem(CACHE_KEY, JSON.stringify(this.cache));
    } catch (error) {
      console.error('Error saving cache:', error);
      this.cleanCache();
    }
  }

  private saveMetrics(): void {
    const storage = this.getLocalStorage();
    if (!storage) return;

    try {
      storage.setItem(METRICS_KEY, JSON.stringify(this.metrics));
    } catch (error) {
      console.error('Error saving metrics:', error);
    }
  }

  private cleanCache(): void {
    const now = Date.now();
    const newCache: any = {};
    
    const entries = Object.entries(this.cache)
      .filter(([_, item]: any) => now - item.timestamp < CACHE_DURATION)
      .sort(([keyA, _a], [keyB, _b]) => {
        const statsA = this.metrics[keyA] || { frequency: 0, lastUsed: 0 };
        const statsB = this.metrics[keyB] || { frequency: 0, lastUsed: 0 };
        return (statsB.frequency * statsB.lastUsed) - (statsA.frequency * statsA.lastUsed);
      });

    entries.slice(0, MAX_CACHE_ITEMS).forEach(([key, value]) => {
      newCache[key] = value;
    });

    this.cache = newCache;
    this.saveCache();
  }

  private getCurrentWord(term: string): string {
    const words = term.toLowerCase().trim().split(/\s+/);
    return words[words.length - 1];
  }

  public searchInCache(term: string): any | null {
    if (term.length < MIN_SEARCH_LENGTH) return null;

    const currentWord = this.getCurrentWord(term);
    
    if (currentWord.length >= MIN_SEARCH_LENGTH) {
      if (Array.from(this.emptyPrefixes).some(prefix => currentWord.startsWith(prefix))) {
        return [];
      }
    }

    const key = term.toLowerCase();
    const cachedItem = this.cache[key];
    if (cachedItem) {
      if (Date.now() - cachedItem.timestamp > CACHE_DURATION) {
        delete this.cache[key];
        this.saveCache();
        return null;
      }
      this.updateMetrics(key);
      return {"categories": cachedItem.categories, "posts": cachedItem.posts};
    }

    return null;
  }

  private updateMetrics(term: string): void {
    if (!this.isClient()) return;

    const now = Date.now();
    if (!this.metrics[term]) {
      this.metrics[term] = { frequency: 0, lastUsed: now };
    }
    this.metrics[term].frequency++;
    this.metrics[term].lastUsed = now;
    this.saveMetrics();
  }

  public updateCache(term: string, categories: any, posts: any): void {
    if (!this.isClient()) return;

    const key = term.toLowerCase();
    const currentWord = this.getCurrentWord(term);

    this.cache[key] = {
      categories,
      posts,
      timestamp: Date.now()
    };

    // Nếu từ hiện tại không có kết quả và dài hơn 2 ký tự, thêm vào emptyPrefixes
    if (categories.length === 0 && posts.length == 0 && currentWord.length >= MIN_SEARCH_LENGTH) {
      this.emptyPrefixes.add(currentWord);
    }

    this.updateMetrics(key);
    this.saveCache();

    if (Object.keys(this.cache).length > MAX_CACHE_ITEMS) {
      this.cleanCache();
    }
  }

  public shouldSkipAPICall(term: string): boolean {
    if (term.length < MIN_SEARCH_LENGTH) return true;

    const currentWord = this.getCurrentWord(term);
    if (currentWord.length >= MIN_SEARCH_LENGTH) {
      if (Array.from(this.emptyPrefixes).some(prefix => currentWord.startsWith(prefix))) {
        return true;
      }
    }

    return false;
  }
}

export const cacheService = new CacheService();
'use client';

import React, { FC, memo } from "react";
import { getPostDataFromPostFragment } from "@/utils/getPostDataFromPostFragment"; 
import Link from "next/link";
import { formatDate } from "@/components/FormatDate";
import CountdownTimer from "@/components/CountdownTimer";

export interface SingleHeaderProps {
  hiddenDesc?: boolean;
  titleMainClass?: string;
  className?: string;
  post: any;
}

const getBaseURL = () => typeof window !== 'undefined' ? window.location.origin : '';

const ShareIcon = memo(({ onClick, children }: { onClick: () => void, children: React.ReactNode }) => (
  <div 
    onClick={onClick}
    className="hover:bg-slate-200 cursor-pointer w-[35px] h-[35px] md:w-[36px] md:h-[36px] rounded-[8px] border flex justify-center items-center heading-share-icon"
  >
    {children}
  </div>
));

ShareIcon.displayName = 'ShareIcon';

const SingleHeader: FC<SingleHeaderProps> = memo(({ post }) => {
  const {
    title,
    categories,
    uri,
    author,
    date
  } = getPostDataFromPostFragment(post || {});

  // Process categories
  const processedCategories = React.useMemo(() => {
    if (!categories?.nodes?.length) return [];
    
    const filteredCategories = categories.nodes.filter((c: any) => 
      c?.name !== "Arborist Merchandising Root" && 
      c.name !== "Self Service" && 
      c.name !== "Custom Stores"
    );

    // Build category hierarchy
    const categoryMap = filteredCategories.reduce((acc: any, category: any) => {
      acc[category.databaseId] = category;
      return acc;
    }, {});

    const sortedCategories = [] as any[];
    filteredCategories.forEach((category: any) => {
      let currentCategory = category;
      const hierarchy = [];

      while (currentCategory) {
        hierarchy.unshift(currentCategory);
        currentCategory = categoryMap[currentCategory.parentDatabaseId];
      }

      hierarchy.forEach(cat => {
        if (!sortedCategories.find(existingCat => existingCat.databaseId === cat.databaseId)) {
          sortedCategories.push(cat);
        }
      });
    });

    return sortedCategories;
  }, [categories]);

  const isUncategorized = React.useMemo(() => 
    categories?.nodes?.length === 1 && categories?.nodes?.[0]?.name === "Uncategorized", 
    [categories]
  );

  const baseURL = React.useMemo(() => getBaseURL(), []);
  const fullUrl = `${baseURL}${uri}`;

  // Share handlers
  const handleShare = React.useCallback((type: 'facebook' | 'twitter' | 'email') => {
    const urls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(fullUrl)}&text=${encodeURIComponent(title)}`,
      email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`I found this interesting: ${fullUrl}`)}`
    };

    window.open(urls[type], 'popup', 'width=600,height=400');
  }, [fullUrl, title]);

  const categorySlug = React.useCallback((uri: string) => 
    uri.split('/').filter(Boolean).pop(), 
    []
  );

  return (
    <>
      {/* Banner Section */}
      <div className="banner-header px-4 gap-2">
        <div className="flex justify-between md:justify-center items-center md:items-start gap-2 w-full md:w-fit">
          <div className="flex flex-wrap flex-col md:flex-row items-start md:items-center gap-1 md:gap-2 mt-1.5">
            <h5 className="text-sm md:text-lg">Black Friday Sale</h5>
            <span className="text-xs md:text-sm font-extralight text-gray-600">
              Today's deals end in
            </span>
          </div>
          <CountdownTimer />
        </div>
      </div>

      <div className='container my-6'>
        {/* Title - LCP Element */}
        <h1 
          className="post-title text-center my-5 md:my-12 font-extrabold leading-[1.1em] max-w-full md:max-w-[690px] mx-auto"
          style={{ contentVisibility: 'auto' }}
        >
          {title}
        </h1>

        {/* Breadcrumbs */}
        {!isUncategorized && (
          <nav aria-label="Breadcrumb">
            <ol className="breadcrumb hidden md:flex flex-wrap gap-1.5 items-center">
              {processedCategories.map((item: any, index: number) => (
                <React.Fragment key={item.id || index}>
                  <li className="breadcrumb__item flex items-center">
                    <Link href={categorySlug(item?.uri) ?? '/'}>
                      <span className="text-[13px] text-[#5B5E61]">
                        {item.name}
                      </span>
                    </Link>
                  </li>
                  {index < processedCategories.length - 1 && (
                    <li>
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 320 512" 
                        className="mt-1" 
                        width="9" 
                        height="9"
                        aria-hidden="true"
                      >
                        <path d="M96 480c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L242.8 256L73.38 86.63c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l192 192c12.5 12.5 12.5 32.75 0 45.25l-192 192C112.4 476.9 104.2 480 96 480z" fill="#5D6266"/>
                      </svg>
                    </li>
                  )}
                </React.Fragment>
              ))}
            </ol>
          </nav>
        )}

        {/* Info and Share Section */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 justify-between">
          <div className="col-span-1">
            <div className="flex gap-2 items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="14" height="14">
                <path d="m256 0c36.8 0 68.8 20.7 84.9 51.1..." fill="#016EF9" />
              </svg>
              <span className="text-sm text-[#191C1F]">
                Fact checked by <Link href={author?.uri ?? "/"} className="underline">{author?.name}</Link>
              </span>
            </div>
            <div className="text-sm flex items-center mt-3 gap-2 flex-wrap text-[#5B5E61]">
              <span>Last Updated</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="8" height="8">
                <path d="M256 8C119 8 8 119..." fill="#92DF00" />
              </svg>
              <span>{formatDate(date, false)}</span>
              <div className="hidden md:flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="16" height="16">
                  <path d="M256 0C114.6 0 0 114.6..." fill="#5D6266" />
                </svg>
                <span>Advertising Disclosure</span>
              </div>
            </div>
          </div>

          {/* Share Buttons */}
          <div className="col-span-1 flex justify-start md:justify-end gap-3 mt-5 md:mt-0">
            <ShareIcon onClick={() => handleShare('twitter')}>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-[17px] h-[17px] md:w-[16px] md:h-[16px]" fill="none" viewBox="0 0 20 20">
                <path fill="#98A2B3" fillRule="evenodd" d="m13.288 19.167-4.625-6.591..." />
              </svg>
            </ShareIcon>
            <ShareIcon onClick={() => handleShare('facebook')}>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-[17px] h-[17px] md:w-[16px] md:h-[16px]" fill="none" viewBox="0 0 20 20">
                <path fill="#98A2B3" d="M20 10c0-5.523-4.477..." />
              </svg>
            </ShareIcon>
            <ShareIcon onClick={() => handleShare('email')}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-[17px] h-[17px] md:w-[16px] md:h-[16px]">
                <path d="M502.3 190.8c3.9-3.1..." fill="#98A2B3" />
              </svg>
            </ShareIcon>
          </div>
        </div>
      </div>
    </>
  );
});

SingleHeader.displayName = 'SingleHeader';

export default SingleHeader;
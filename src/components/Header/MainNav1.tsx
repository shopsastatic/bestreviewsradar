import { FC, memo, useEffect, useRef, useState } from 'react';
import { useSearch } from '../../hooks/useSearch';
import { useRouter } from 'next/router';
import Navigation from '@/components/Navigation/Navigation';
import MenuBar from '@/components/MenuBar/MenuBar';
import { SearchIconBtn } from './HeaderSearch';
import Link from 'next/link';
import { FragmentType } from '@/__generated__';

export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface MainNav1Props {
  menuItems: FragmentType<any>[];
  title?: string | null;
  description?: string | null;
  sidebarMenuItems: any
}

const DEBOUNCE_TIME = 600;

// SearchResults Component
const SearchResults = memo(({
  results,
  searchValue,
  onSelect
}: {
  results: Category[];
  searchValue: string;
  onSelect: (category: Category) => void;
}) => (
  <ul className="absolute z-20 max-h-[200px] overflow-y-auto bg-white border border-gray-300 w-full mt-2 rounded shadow-lg">
    {results.map((category, index) => (
      <li
        key={index}
        className="p-2 hover:bg-gray-100 cursor-pointer text-black text-base"
        onClick={() => onSelect(category)}
      >
        <HighlightedText text={category.name} highlight={searchValue} />
      </li>
    ))}
  </ul>
));

SearchResults.displayName = 'SearchResults';

const HighlightedText = memo(({
  text,
  highlight
}: {
  text: string;
  highlight: string;
}) => {
  if (!highlight) return <>{text}</>;

  const parts = text.split(new RegExp(`(${highlight})`, 'gi'));

  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === highlight.toLowerCase() ? (
          <span key={i} className="text-[#ff6b00]">{part}</span>
        ) : (
          part
        )
      )}
    </>
  );
});

HighlightedText.displayName = 'HighlightedText';

const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="22"
    height="22"
    viewBox="0 0 22 22"
    fill="none"
  >
    <path
      d="M20.8438 19.8281C21.0781 20.0365 21.0781 20.2578 20.8438 20.4922L20.4922 20.8438C20.2578 21.0781 20.0365 21.0781 19.8281 20.8438L14.7891 15.8438C14.6849 15.7396 14.6328 15.6224 14.6328 15.4922V15.1016C13.0703 16.5339 11.2344 17.25 9.125 17.25C6.88542 17.25 4.97135 16.4557 3.38281 14.8672C1.79427 13.2786 1 11.3646 1 9.125C1 6.88542 1.79427 4.97135 3.38281 3.38281C4.97135 1.79427 6.88542 1 9.125 1C11.3646 1 13.2786 1.79427 14.8672 3.38281C16.4557 4.97135 17.25 6.88542 17.25 9.125C17.25 11.2344 16.5339 13.0703 15.1016 14.6328H15.4922C15.6224 14.6328 15.7396 14.6849 15.8438 14.7891L20.8438 19.8281ZM4.24219 14.0078C5.59635 15.3359 7.22396 16 9.125 16C11.026 16 12.6406 15.3359 13.9688 14.0078C15.3229 12.6536 16 11.026 16 9.125C16 7.22396 15.3229 5.60938 13.9688 4.28125C12.6406 2.92708 11.026 2.25 9.125 2.25C7.22396 2.25 5.59635 2.92708 4.24219 4.28125C2.91406 5.60938 2.25 7.22396 2.25 9.125C2.25 11.026 2.91406 12.6536 4.24219 14.0078Z"
      fill="black"
    />
  </svg>
);

const LoadingSpinner = () => (
  <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-900 border-t-transparent" />
);

const MainNav1: FC<MainNav1Props> = ({ menuItems, title, description, sidebarMenuItems }) => {
  const router = useRouter();
  const [isShowResults, setIsShowResults] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const {
    searchValue,
    results,
    isLoading,
    error,
    handleSearch
  } = useSearch({
    minLength: 2,
    debounceMs: DEBOUNCE_TIME
  }) as any;

  const categoryResults = results?.categories || results || []

  const handleSelect = (category: Category) => {
    router.push(`/${category.slug}`);
    setIsShowResults(false);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const searchVal = e.target[0].value
    router.push({
      pathname: `/search/${searchVal}`,
    });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="header-top bg-[#1b1d31] text-white py-3">
        <div className="max-w-[1200px] m-auto flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/">
              <img
                src="https://img.bestreviewsradar.com/images/f_auto,q_auto//v1732270282/logo-bestreviewsradar/logo-bestreviewsradar.png"
                loading='lazy'
                alt="Logo Best Reviews Radar"
                width={140}
                height={'auto'}
              />
            </Link>
            <div className="items-center hidden md:flex">
              <MenuBar menuItems={menuItems} sideBarMenuItem={sidebarMenuItems} />
          </div>
            <div ref={searchContainerRef} className="relative ml-10 hidden min-[895px]:block md:min-w-[400px] lg:min-w-[500px] xl:min-w-[700px]">
              <form onSubmit={handleSubmit} className="relative">
                <input type="search" value={searchValue}
                  onChange={(e) => handleSearch(e.target.value)}
                  onFocus={() => setIsShowResults(true)}
                  id="search-input" placeholder="Search..." autoComplete="off" className="w-full focus:ring-0 border-opacity-0 py-2.5 text-base shadow-md pe-3 sm:pe-5 text-neutral-800 rounded"></input>
                <button type="submit" aria-label="Search" className="absolute top-[1px] bottom-[1px] right-0 px-5 flex justify-center bg-[#eeeeee] items-center z-10 rounded-tr rounded-br" disabled={isLoading}>

                  {isLoading ? <LoadingSpinner /> : <SearchIcon />}
                </button>
              </form>


              {/* Chỉ hiển thị kết quả khi có kết quả và isShowResults = true */}
              {isShowResults && categoryResults?.length > 0 && (
                <SearchResults
                  results={categoryResults}
                  searchValue={searchValue}
                  onSelect={handleSelect}
                />
              )}

              {error && (
                <div className="absolute w-full mt-2 p-2 bg-red-100 text-red-600 rounded">
                  {error}
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-end items-center gap-2">
            <Link href="/">
              <img
                src="https://img.bestreviewsradar.com/images/f_auto,q_auto/v1732520637/us/us.png"
                className="w-[24px] h-[24px] md:h-[28px] md:w-[28px]"
                alt="US flag"
                loading='lazy'
              />
            </Link>
            <SearchIconBtn className="!text-white hidden max-[895px]:block" />
            <MenuBar
              menuItems={menuItems}
              className="p-0 ml-0 block md:hidden"
            />
          </div>
        </div>
      </div>

      <div className="header-bottom bg-[#252E43] hidden md:block">
        <div className="max-w-[1200px] m-auto overflow-x-auto overflow-y-hidden [&::-webkit-scrollbar]:h-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/20 hover:[&::-webkit-scrollbar-thumb]:bg-white/40">
          <Navigation
            menuItems={menuItems}
            className="flex text-white"
          />
        </div>
      </div>
    </>
  );
};

export default memo(MainNav1);
// components/TableOfContents.tsx
import { FC, memo } from 'react';

interface TableOfContentsProps {
  headings: Array<{
    id: string;
    text: string;
  }>;
  activeHeading: string;
}

const TableOfContents: FC<TableOfContentsProps> = memo(({ headings, activeHeading }) => {
  return (
    <div className='article_menu col-span-3 mb-10 lg:mb-0 flex flex-col lg:block justify-between lg:sticky top-0 h-fit p-5 md:p-2 md:pt-0 rounded lg:shadow-none'>
      {headings?.length > 0 && (
        <p className='pb-0 lg:pb-4 border-0 lg:border-b border-[#999] uppercase font-semibold'>
          On This Page
        </p>
      )}

      {/* Desktop menu */}
      <ul className='mt-4 flex-col gap-6 hidden lg:flex'>
        {headings.map((heading) => (
          <li
            key={heading.id}
            className={`border-l-2 transition-[padding-left, border-color, color] ${
              activeHeading === heading.id
                ? 'duration-300 font-semibold border-blue-600'
                : 'duration-300 font-normal border-transparent'
            }`}
          >
            
            <a href={`#${heading.id}`}
              className={`text-[15px] font-medium text-[#42495f] duration-500 block ease-in-out ${
                activeHeading === heading.id ? 'translate-x-5' : 'translate-x-0'
              }`}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>

      {/* Mobile menu */} 
      <ul className='mt-4 flex-col gap-5 flex lg:hidden'>
        {headings.map((heading) => (
          <li
            key={heading.id}
            className={`border-l-2 transition-[padding-left, border-color, color] ${
              activeHeading === heading.id
                ? 'duration-300 font-semibold border-blue-600'
                : 'duration-300 font-normal border-transparent'
            }`}
          >
            
            <a href={`#${heading.id}`}
              className={`text-[15px] font-medium text-[#42495f] duration-500 block ease-in-out ${
                activeHeading === heading.id ? 'translate-x-5' : 'translate-x-0'
              }`}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
});

TableOfContents.displayName = 'TableOfContents';

export default TableOfContents;
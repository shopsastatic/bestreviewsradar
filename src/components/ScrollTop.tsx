"use client";
import { memo } from 'react';
import { ArrowUp } from 'lucide-react';

const ScrollTop = memo(() => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`
        fixed bottom-6 right-6 
        bg-blue-500 hover:bg-blue-600
        text-white rounded-full p-3 
        shadow-lg cursor-pointer z-50
        transition-all duration-300 ease-in-out
        hover:-translate-y-1 active:scale-95
      `}
    >
      <ArrowUp className="w-5 h-5" strokeWidth={2.5} />
    </button>
  );
});

ScrollTop.displayName = 'ScrollTop';

export default ScrollTop;
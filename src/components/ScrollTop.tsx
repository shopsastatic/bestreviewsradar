"use client";
import { useEffect, useState, memo } from 'react';
import { ArrowUp } from 'lucide-react';

const ScrollTop = memo(() => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateScrollButton = () => {
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      setIsVisible(scrollPercent > 10);
      ticking = false;
    };

    const onScroll = () => {
      lastScrollY = window.scrollY;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateScrollButton();
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const ScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      onClick={ScrollTop}
      aria-label="Scroll to top"
      className={`
        fixed bottom-6 right-6 
        bg-blue-500 hover:bg-blue-600
        text-white rounded-full p-3 
        shadow-lg cursor-pointer z-50
        transition-all duration-300 
        hover:-translate-y-1 active:scale-95
        ${isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-10 pointer-events-none'
        }
      `}
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
});

ScrollTop.displayName = 'ScrollTop';

export default ScrollTop;
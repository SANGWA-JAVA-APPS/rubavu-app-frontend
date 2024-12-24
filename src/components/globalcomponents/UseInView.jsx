import React, { useEffect, useState } from 'react'

export const UseInView = (ref, offset = 0) => {
    const [isInView, setIsInView] = useState(false);
  
    useEffect(() => {
      const handleScroll = () => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const inView = rect.top + offset <= window.innerHeight && rect.bottom >= 0;
        setIsInView(inView);
      };
      // Attach scroll listener
      window.addEventListener('scroll', handleScroll);
      handleScroll(); // Trigger on mount
      // Cleanup on unmount
      return () => window.removeEventListener('scroll', handleScroll);
    }, [ref, offset]);
  
    return isInView;
  };

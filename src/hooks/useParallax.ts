import { useState, useEffect } from 'react';

/**
 * High-performance hook for subtle scroll-driven parallax effects
 * Uses requestAnimationFrame and passive scroll listeners
 */
export function useParallaxScroll(speed = 0.1, maxOffset = 60) {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    let ticking = false;

    const updateParallax = () => {
      const scrollPos = window.scrollY || window.pageYOffset;
      // Calculate clamped parallax offset
      const calculatedOffset = Math.max(-maxOffset, Math.min(maxOffset, scrollPos * speed));
      setOffsetY(calculatedOffset);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    updateParallax();

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [speed, maxOffset]);

  return offsetY;
}

/**
 * Hook for element-specific scroll progress parallax
 */
export function useScrollProgress() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY || window.pageYOffset);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return scrollY;
}

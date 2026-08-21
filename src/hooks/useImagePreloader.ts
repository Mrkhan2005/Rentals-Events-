import { useState, useEffect } from 'react';

interface UseImagePreloaderOptions {
  timeoutMs?: number;
}

export function useImagePreloader(imageUrls: string[], options: UseImagePreloaderOptions = {}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const { timeoutMs = 2500 } = options;

  useEffect(() => {
    if (!imageUrls || imageUrls.length === 0) {
      setIsLoaded(true);
      setProgress(100);
      return;
    }

    let isMounted = true;
    let loadedCount = 0;
    const total = imageUrls.length;

    // Safety timeout to prevent blocking in case of slow or blocked network
    const timer = setTimeout(() => {
      if (isMounted) {
        setIsLoaded(true);
        setProgress(100);
      }
    }, timeoutMs);

    const checkDone = () => {
      loadedCount++;
      if (isMounted) {
        const currentProgress = Math.min(100, Math.round((loadedCount / total) * 100));
        setProgress(currentProgress);
        if (loadedCount >= total) {
          clearTimeout(timer);
          setIsLoaded(true);
        }
      }
    };

    imageUrls.forEach(url => {
      if (!url) {
        checkDone();
        return;
      }
      const img = new Image();
      img.src = url;
      if (img.complete) {
        checkDone();
      } else {
        img.onload = checkDone;
        img.onerror = checkDone;
      }
    });

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [imageUrls.join(','), timeoutMs]);

  return { isLoaded, progress };
}

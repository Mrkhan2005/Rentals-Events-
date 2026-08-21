import React from 'react';
import { useImagePreloader } from '../hooks/useImagePreloader';

interface ImagePreloaderProps {
  images: string[];
  children: (isReady: boolean, progress: number) => React.ReactNode;
  fallback?: React.ReactNode;
  timeoutMs?: number;
}

export const ImagePreloader: React.FC<ImagePreloaderProps> = ({
  images,
  children,
  fallback,
  timeoutMs = 2000,
}) => {
  const { isLoaded, progress } = useImagePreloader(images, { timeoutMs });

  return (
    <>
      {!isLoaded && fallback ? fallback : null}
      {children(isLoaded, progress)}
    </>
  );
};

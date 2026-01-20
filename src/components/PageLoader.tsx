import { useState, useEffect, ReactNode } from 'react';

interface PageLoaderProps {
  children: ReactNode;
  images: string[];
  backgroundImages?: string[];
}

const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => resolve();
    img.src = src;
  });
};

export default function PageLoader({ children, images, backgroundImages = [] }: PageLoaderProps) {
  // Skip loading screen if we're restoring scroll position (coming back from class detail)
  const isRestoringScroll = sessionStorage.getItem('restoreScroll') === 'true';
  const [loaded, setLoaded] = useState(isRestoringScroll);

  useEffect(() => {
    // If already loaded (restoring scroll), just preload in background
    if (loaded) {
      if (backgroundImages.length > 0) {
        backgroundImages.forEach(src => {
          const img = new Image();
          img.src = src;
        });
      }
      return;
    }

    if (images.length === 0) {
      setLoaded(true);
      return;
    }

    Promise.all(images.map(preloadImage)).then(() => {
      setLoaded(true);

      // After page is ready, quietly preload other pages' images
      if (backgroundImages.length > 0) {
        backgroundImages.forEach(src => {
          const img = new Image();
          img.src = src;
        });
      }
    });
  }, [images, backgroundImages, loaded]);

  if (!loaded) {
    return <div className="page-loader" />;
  }

  return <>{children}</>;
}

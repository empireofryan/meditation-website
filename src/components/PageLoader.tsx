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
  const [loaded, setLoaded] = useState(() => {
    try {
      return sessionStorage.getItem('restoreScroll') === 'true';
    } catch {
      return false;
    }
  });

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

    // Add timeout fallback to prevent infinite loading
    const timeout = setTimeout(() => {
      setLoaded(true);
    }, 3000);

    Promise.all(images.map(preloadImage)).then(() => {
      clearTimeout(timeout);
      setLoaded(true);

      // After page is ready, quietly preload other pages' images
      if (backgroundImages.length > 0) {
        backgroundImages.forEach(src => {
          const img = new Image();
          img.src = src;
        });
      }
    });

    return () => clearTimeout(timeout);
  }, [images, backgroundImages, loaded]);

  if (!loaded) {
    return <div className="page-loader" />;
  }

  return <>{children}</>;
}

import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';

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
  // Skip loading screen if:
  // 1. We're restoring scroll position (coming back from class detail)
  // 2. There's a hash in the URL (navigating to specific section like /#classes)
  // 3. App has already loaded once this session (internal SPA navigation — no flicker)
  const [loaded, setLoaded] = useState(() => {
    try {
      const hasHash = window.location.hash.length > 0;
      const restoreScroll = sessionStorage.getItem('restoreScroll') === 'true';
      const appLoaded = sessionStorage.getItem('appLoaded') === 'true';
      return hasHash || restoreScroll || appLoaded;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    // If already loaded, preload images in background only, no blocking screen
    if (loaded) {
      const allImages = [...images, ...backgroundImages];
      allImages.forEach(src => { const img = new Image(); img.src = src; });
      return;
    }

    if (images.length === 0) {
      sessionStorage.setItem('appLoaded', 'true');
      setLoaded(true);
      return;
    }

    // Add timeout fallback to prevent infinite loading
    const timeout = setTimeout(() => {
      sessionStorage.setItem('appLoaded', 'true');
      setLoaded(true);
    }, 3000);

    Promise.all(images.map(preloadImage)).then(() => {
      clearTimeout(timeout);
      sessionStorage.setItem('appLoaded', 'true');
      setLoaded(true);

      // After page is ready, quietly preload other pages' images
      backgroundImages.forEach(src => { const img = new Image(); img.src = src; });
    });

    return () => clearTimeout(timeout);
  }, [images, backgroundImages, loaded]);

  if (!loaded) {
    return <div className="page-loader" />;
  }

  return <>{children}</>;
}

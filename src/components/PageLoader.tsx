import { useState, useEffect, ReactNode } from 'react';

interface PageLoaderProps {
  children: ReactNode;
  images: string[];
}

export default function PageLoader({ children, images }: PageLoaderProps) {
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (images.length === 0) {
      setLoaded(true);
      return;
    }

    let loadedCount = 0;
    const totalImages = images.length;

    const preloadImage = (src: string): Promise<void> => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          loadedCount++;
          setProgress(Math.round((loadedCount / totalImages) * 100));
          resolve();
        };
        img.onerror = () => {
          loadedCount++;
          setProgress(Math.round((loadedCount / totalImages) * 100));
          resolve();
        };
        img.src = src;
      });
    };

    Promise.all(images.map(preloadImage)).then(() => {
      setLoaded(true);
    });
  }, [images]);

  if (!loaded) {
    return (
      <div className="page-loader">
        <div className="loader-content">
          <div className="loader-spinner"></div>
          <div className="loader-progress">{progress}%</div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

import { useEffect, useState } from 'react';

const getWindowDimensions = () => ({
  width: window.innerWidth,
  height: window.innerHeight,
});

export const useViewport = () => {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions(getWindowDimensions());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
};

import { useEffect } from 'react';
import type React from 'react';

type Args<T extends HTMLElement> = {
  element: React.RefObject<T>['current'];
  onUpdate?: (entry: ResizeObserverEntry) => void;
};

export const useSizeObserver = <T extends HTMLElement = HTMLDivElement>(
  { element, onUpdate }: Args<T>,
  deps: React.DependencyList = []
) => {
  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        onUpdate?.(entry);
      }
    });

    if (element) {
      observer.observe(element);
    }

    return () => {
      console.log('unobserve');
      if (element) {
        observer.unobserve(element);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [element, ...deps]);
};

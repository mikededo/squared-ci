import React, { useEffect } from 'react';

type Args<T extends HTMLElement> = {
  element: React.RefObject<T>['current'];
  onUpdate?: (entry: ResizeObserverEntry) => void;
};

export const useSizeObserver = <T extends HTMLElement = HTMLDivElement>({
  element,
  onUpdate,
}: Args<T>) => {
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
      if (element) {
        observer.unobserve(element);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [element]);
};

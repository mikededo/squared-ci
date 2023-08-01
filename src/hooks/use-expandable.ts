import { atom, useAtom } from 'jotai';
import { useEffect, useMemo, useRef } from 'react';

import { useSizeObserver } from './use-size-observer';

export type WithExpandableRef<T extends HTMLElement = HTMLElement> = {
  expandableRef: React.LegacyRef<T>;
};
export type ExpandableToggler = { onExpand?: () => void };

const elementHeight = (ref: HTMLElement | null) =>
  ref?.getBoundingClientRect().height ?? 0;

export const useExpandable = <
  T extends HTMLElement,
  J extends HTMLElement
>() => {
  const visibleRef = useRef<T>(null);
  const invisibleRef = useRef<J>(null);

  const [expanded, setExpanded] = useAtom(useMemo(() => atom(false), []));
  const [count, setCount] = useAtom(useMemo(() => atom(0), []));
  const [height, setHeight] = useAtom(
    useMemo(() => atom(elementHeight(visibleRef.current)), [])
  );

  useSizeObserver(
    {
      element: visibleRef?.current,
      onUpdate: (entry) => {
        setHeight(
          expanded
            ? entry.contentRect.height + elementHeight(invisibleRef.current)
            : entry.contentRect.height
        );
      },
    },
    [expanded]
  );

  const handleOnExpandToggle = () => {
    setExpanded(!expanded);
    setCount(count + 1);
  };

  useEffect(() => {
    setHeight(
      expanded
        ? elementHeight(visibleRef.current) +
            elementHeight(invisibleRef.current)
        : elementHeight(visibleRef.current)
    );
  }, [expanded, visibleRef, invisibleRef, setHeight]);

  return {
    isExpanded: expanded,
    visibleRef,
    invisibleRef,
    height,
    onExpandToggle: handleOnExpandToggle,
  };
};

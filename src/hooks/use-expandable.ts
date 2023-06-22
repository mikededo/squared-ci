import { atom, useAtom } from 'jotai';
import { useEffect, useMemo, useRef } from 'react';

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

  const [height, setHeight] = useAtom(
    useMemo(() => atom(elementHeight(visibleRef.current)), [])
  );

  const handleOnExpandToggle = () => {
    setExpanded(!expanded);
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

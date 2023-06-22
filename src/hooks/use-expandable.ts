import { atom, createStore, useAtom } from 'jotai';
import { useMemo, useRef } from 'react';

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
  const expandableAtom = useMemo(() => atom(true), []);
  const expandableStore = useMemo(() => createStore(), []);
  const [expanded, setExpanded] = useAtom(expandableAtom);

  const height = useMemo(
    () =>
      expanded
        ? elementHeight(visibleRef.current) +
          elementHeight(invisibleRef.current)
        : elementHeight(visibleRef.current),
    [expanded]
  );

  const handleOnExpandToggle = () => {
    setExpanded(!expanded);
  };

  return {
    isExpanded: expanded,
    expandableStore,
    visibleRef,
    invisibleRef,
    height,
    onExpandToggle: handleOnExpandToggle,
  };
};

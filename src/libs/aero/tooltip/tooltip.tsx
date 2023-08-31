import { atom, useAtom } from 'jotai';
import React, { useEffect, useMemo, useRef } from 'react';
import { createPortal } from 'react-dom';

import { AppearTransition } from '@/aero';

type Props = {
  children: React.ReactElement;
  text: string;
};

export const Tooltip: React.FC<Props> = ({ children, text }) => {
  const childRef = useRef<HTMLElement>(null);
  const [showTooltip, setShowTooltip] = useAtom(useMemo(() => atom(false), []));

  useEffect(() => {
    if (!childRef.current) {
      throw new Error('Tooltip child must forward the ref.');
    }
  }, []);

  const handleOnMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleOnMouseLeave = () => {
    setShowTooltip(false);
  };

  const rect = childRef.current?.getBoundingClientRect();
  const x = (rect?.x ?? 0) + (rect?.width ?? 0) / 2;
  const y = (rect?.y ?? 0) + (rect?.height ?? 0);

  return (
    <>
      {React.cloneElement(children, {
        ref: childRef,
        onMouseEnter: handleOnMouseEnter,
        onMouseLeave: handleOnMouseLeave,
      })}
      {createPortal(
        <AppearTransition show={showTooltip}>
          <div
            className="fixed z-10 px-2 py-1 text-xs text-white -translate-x-1/2 translate-y-2 rounded-sm bg-tooltip text-tooltip-foreground whitespace-nowrap pointer-events-none"
            style={{ top: y, left: x }}
          >
            <span className="w-full">{text}</span>
          </div>
        </AppearTransition>,
        document.body,
      )}
    </>
  );
};

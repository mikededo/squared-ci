import React from 'react';

import { useViewport } from '@/hooks';

import { BoxTriggerConnector } from './box-trigger-connector';
import { BoxTriggerProps } from './box-trigger-props';
import { BoxTriggerSelector } from './box-trigger-selector';
import { useBoxTrigger } from './use-box-trigger';

export const BoxTrigger = () => {
  const { width, height } = useViewport();
  const { ref, triggers, onTriggerChange, onParentChange } = useBoxTrigger();

  return (
    <>
      <svg
        className="fill-none fixed pointer-events-none"
        width={width}
        height={height}
      >
        {[...triggers].map((trigger) => (
          <BoxTriggerConnector key={trigger} trigger={trigger} />
        ))}
      </svg>
      <BoxTriggerSelector
        innerRef={ref}
        selected={triggers}
        onPositionChange={onParentChange}
        onTriggerChange={onTriggerChange}
      />
      {[...triggers].map((trigger) => (
        <BoxTriggerProps key={trigger} trigger={trigger} />
      ))}
    </>
  );
};

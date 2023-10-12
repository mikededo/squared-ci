import React, { useRef } from 'react';

import { Draggable, DraggableTitle, DraggableWrapper } from '@/aero';
import { ActionsDocs, Positions } from '@/editor/config';
import { useOptionalSection } from '@/editor/stores';

import { ConcurrencyContent } from './content';

export const BoxConcurrency: React.FC = () => {
  const innerRef = useRef(null);
  const { osConcurrency } = useOptionalSection('osConcurrency');

  return osConcurrency ? (
    <DraggableWrapper>
      <Draggable
        innerRef={innerRef}
        initialX={Positions.BoxConcurrencyX}
        initialY={Positions.BoxConcurrencyY}
        visible={({ ref, onExpand }) => (
          <DraggableWrapper>
            <div ref={ref}>
              <DraggableTitle
                title="Concurrency"
                docsHref={ActionsDocs.workflowConcurrency}
                onExpand={onExpand}
              />
            </div>
          </DraggableWrapper>
        )}
        invisible={({ ref }) => <ConcurrencyContent ref={ref} />}
      />
    </DraggableWrapper>
  ) : null;
};

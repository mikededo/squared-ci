import React, { useRef } from 'react';

import { Draggable, DraggableTitle, DraggableWrapper } from '@/aero';
import { ActionsDocs, Positions } from '@/editor/config';
import { useOptionalSection } from '@/editor/stores';

import { BoxDefaultsContent } from './content';

export const BoxDefaults: React.FC = () => {
  const innerRef = useRef<HTMLDivElement>(null);
  const { osDefaults } = useOptionalSection('osDefaults');

  return osDefaults ? (
    <DraggableWrapper>
      <Draggable
        innerRef={innerRef}
        initialX={Positions.BoxDefaultsX}
        initialY={Positions.BoxDefaultsY}
      >
        <DraggableWrapper>
          <DraggableTitle
            title="Job defaults"
            docsHref={ActionsDocs.workflowDefaults}
          />
          <div className="px-3 pb-3">
            <BoxDefaultsContent />
          </div>
        </DraggableWrapper>
      </Draggable>
    </DraggableWrapper>
  ) : null;
};

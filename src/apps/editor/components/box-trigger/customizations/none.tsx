import React from 'react';

import { DraggableWrapper, Meta } from '@/aero';

export const None: React.FC = () => (
  <DraggableWrapper>
    <Meta className="text-center max-w-[240px]">
      This workflow method does not have any customization value.
    </Meta>
  </DraggableWrapper>
);

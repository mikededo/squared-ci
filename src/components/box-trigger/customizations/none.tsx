import React from 'react';

import { DraggableWrapper, Meta } from '@/sd';

export const None: React.FC = () => (
  <DraggableWrapper>
    <Meta className="text-center max-w-[240px]">
      This workflow method does not have any customization value.
    </Meta>
  </DraggableWrapper>
);

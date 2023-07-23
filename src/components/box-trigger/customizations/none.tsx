import React from 'react';

import { DraggableWrapper } from '@/sd';

export const None: React.FC = () => (
  <DraggableWrapper>
    <p className="text-sm text-center text-gray-400 max-w-[240px]">
      This workflow method does not have any customization value.
    </p>
  </DraggableWrapper>
);

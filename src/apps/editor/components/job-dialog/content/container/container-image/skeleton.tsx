import React from 'react';

import { Row, VCol } from '@/aero';

export const ImageSkeleton: React.FC = () => (
  <div className="h-8 w-9 rounded-sm bg-muted-hover border border-border/75" />
);

export const SelectSkeleton: React.FC = () => (
  <Row variant="lg" className="px-4 py-2 animate-pulse" align="center" expand>
    <ImageSkeleton />
    <VCol variant="md" expand>
      <div className="w-full h-3 bg-muted-hover" />
      <Row justify="between" expand>
        <div className="w-1/3 h-2 bg-muted-hover" />
        <div className="w-7 h-2 bg-muted-hover" />
      </Row>
    </VCol>
  </Row>
);

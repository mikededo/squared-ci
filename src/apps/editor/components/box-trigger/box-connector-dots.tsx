import React from 'react';

import { Dot } from '@/aero';
import { useWorkflowTriggersStore } from '@/editor/stores';

export const BoxConnectorDots: React.FC = () => {
  const { triggers: selected } = useWorkflowTriggersStore();

  return (
    <>
      <Dot active={selected.size > 0} position="left" />
      <Dot active={selected.size > 0} position="right" />
    </>
  );
};

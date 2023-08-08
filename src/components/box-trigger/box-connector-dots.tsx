import React from 'react';

import { Dot } from '@/sd';
import { useWorkflowTriggersStore } from '@/stores';

export const BoxConnectorDots: React.FC = () => {
  const { triggers: selected } = useWorkflowTriggersStore();

  return (
    <>
      <Dot active={selected.size > 0} position="left" />
      <Dot active={selected.size > 0} position="right" />
    </>
  );
};

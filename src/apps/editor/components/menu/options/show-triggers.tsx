import { EyeClosedIcon, EyeIcon } from '@primer/octicons-react';
import React from 'react';

import { IconButton } from '@/aero';
import { useWorkflowTriggersToggler } from '@/editor/stores';

export const ShowTriggers: React.FC = () => {
  const { hideTriggers, toggleHideTriggers } = useWorkflowTriggersToggler();

  return (
    <IconButton
      tooltip="Hide trigger props"
      className="!p-2"
      selected={hideTriggers}
      onClick={toggleHideTriggers}
    >
      {!hideTriggers ? <EyeIcon /> : <EyeClosedIcon />}
    </IconButton>
  );
};

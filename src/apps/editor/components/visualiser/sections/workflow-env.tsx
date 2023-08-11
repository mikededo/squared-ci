import React from 'react';

import { List } from '@/aero';
import { useWorkflowEnv } from '@/editor/stores';

export const WorkflowEnv: React.FC = () => {
  const { variables } = useWorkflowEnv();

  if (!variables.size) {
    return null;
  }

  const parsedVariables = [...variables].map((variable) =>
    variable.replace('=', ': '),
  );
  return (
    <List group="env" items={[...parsedVariables]} tabFactor={0} asBulletList />
  );
};

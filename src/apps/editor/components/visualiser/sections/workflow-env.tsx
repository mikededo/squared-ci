import React from 'react';

import { Keyword, List, Tabbed } from '@/aero';
import { useWorkflowEnv } from '@/editor/stores';

export const WorkflowEnv: React.FC = () => {
  const { variables } = useWorkflowEnv();

  if (!variables.size) {
    return null;
  }

  const parsedVariables = [...variables].map((variable) => {
    const [name, value] = variable.split('=');

    return (
      <Tabbed tabs={2} key={variable}>
        <Keyword>{name}</Keyword>: {value}
      </Tabbed>
    );
  });

  return (
    <List group="env" items={parsedVariables} tabFactor={0} asBulletList />
  );
};

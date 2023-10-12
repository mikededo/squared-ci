import React from 'react';

import { Keyword, Line, YamlVisualiser } from '@/aero';
import { useWorkflowDefaults } from '@/editor/stores';

export const WorkflowDefaults: React.FC = () => {
  const {
    defaults: { matrix },
  } = useWorkflowDefaults();

  if (matrix.length === 0) {
    return null;
  }

  return (
    <>
      <Line>
        <Keyword>defaults</Keyword>:
      </Line>
      {matrix.length > 0 ? (
        <YamlVisualiser title="matrix" yaml={matrix} tabs={2} />
      ) : null}
    </>
  );
};

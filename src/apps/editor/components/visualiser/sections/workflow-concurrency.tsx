import React from 'react';

import { Keyword, Line, Tabbed } from '@/aero';
import { useWorkflowConcurrency } from '@/editor/stores';

export const WorkflowConcurrency: React.FC = () => {
  const {
    concurrency: { cancelInProgress, group, max },
  } = useWorkflowConcurrency();

  const anyConcurrency = cancelInProgress || group !== '' || max > 0;
  if (!anyConcurrency) {
    return null;
  }

  return (
    <>
      <Line>
        <Keyword>concurrency</Keyword>:
      </Line>
      {cancelInProgress ? (
        <Tabbed tabs={2}>
          <Keyword>cancel-in-progress</Keyword>: true
        </Tabbed>
      ) : null}
      {group !== '' ? (
        <Tabbed tabs={2}>
          <Keyword>group</Keyword>: {group}
        </Tabbed>
      ) : null}
      {max > 0 ? (
        <Tabbed tabs={2}>
          <Keyword>max</Keyword>: {max}
        </Tabbed>
      ) : null}
    </>
  );
};

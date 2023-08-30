import React from 'react';

import { Keyword, Line, Tabbed } from '@/aero';
import { useWorkflowConcurrency } from '@/editor/stores';

import { Matrix } from './matrix';

export const WorkflowConcurrency: React.FC = () => {
  const {
    concurrency: { name, cancelInProgress, group, max, matrix },
  } = useWorkflowConcurrency();

  const anyConcurrency =
    cancelInProgress || group !== '' || max > 0 || matrix.length > 0;
  if (!anyConcurrency && name === '') {
    return null;
  }

  return name !== '' ? (
    <Line>
      <Keyword>concurrency</Keyword>: {name}
    </Line>
  ) : (
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
      {matrix.length > 0 ? <Matrix matrix={matrix} tabs={2} /> : null}
    </>
  );
};

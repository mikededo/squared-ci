import React from 'react';

import { VisualiserItems } from '@/sd';
import { useWorkflowBasicsStore } from '@/stores';

const { Comment, Keyword, Line } = VisualiserItems;

export const WorkflowBasics: React.FC = () => {
  const { name, runName } = useWorkflowBasicsStore();

  return (
    <>
      <Line>
        <Keyword>name</Keyword>
        :&nbsp;
        {name ? <span>{name}</span> : <Comment># Required field!</Comment>}
      </Line>
      {runName ? (
        <Line>
          <Keyword>run-name</Keyword>
          <span>:&nbsp;{runName}</span>
        </Line>
      ) : null}
    </>
  );
};

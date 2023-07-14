import React from 'react';

import { Header, Main, Page } from './layout';
import { WorkflowBasics, WorkflowTriggers } from './sections';
import { Comment, Line } from './shared';

export const Visualiser: React.FC = () => (
  <Page>
    <Header />
    <Main>
      <Line>
        <Comment>
          # Want to see changes? Start updating the &quot;Workflow basics&quot;
          box
        </Comment>
      </Line>
      <WorkflowBasics />
      <WorkflowTriggers />
    </Main>
  </Page>
);

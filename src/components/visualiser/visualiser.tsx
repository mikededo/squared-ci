import React from 'react';

import { Header, Main, Page } from './layout';
import { WorkflowBasics, WorkflowJobs, WorkflowTriggers } from './sections';

export const Visualiser: React.FC = () => (
  <Page>
    <Header />
    <Main>
      <WorkflowBasics />
      <WorkflowTriggers />
      <WorkflowJobs />
    </Main>
  </Page>
);

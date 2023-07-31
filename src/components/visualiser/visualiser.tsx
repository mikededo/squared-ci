import React from 'react';

import { VCol } from '@/sd';

import { Footer, Header, Main, Page } from './layout';
import { WorkflowBasics, WorkflowJobs, WorkflowTriggers } from './sections';

export const Visualiser: React.FC = () => (
  <Page>
    <VCol className="h-full">
      <Header />
      <Main>
        <WorkflowBasics />
        <WorkflowTriggers />
        <WorkflowJobs />
      </Main>
      <Footer />
    </VCol>
  </Page>
);

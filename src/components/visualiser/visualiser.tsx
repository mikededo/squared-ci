import React from 'react';

import { VCol } from '@/sd';

import { Footer, Header, Main, Page } from './layout';
import {
  WorkflowBasics,
  WorkflowJobs,
  WorkflowPermissions,
  WorkflowTriggers,
} from './sections';

export const Visualiser: React.FC = () => (
  <Page>
    <VCol className="h-full">
      <Header />
      <Main>
        <WorkflowBasics />
        <WorkflowTriggers />
        <WorkflowPermissions />
        <WorkflowJobs />
      </Main>
      <Footer />
    </VCol>
  </Page>
);

import React from 'react';

import { VCol } from '@/aero';

import { Content, Footer, Header, Main } from './layout';
import {
  WorkflowBasics,
  WorkflowConcurrency,
  WorkflowDefaults,
  WorkflowEnv,
  WorkflowJobs,
  WorkflowPermissions,
  WorkflowTriggers,
} from './sections';

export const Visualiser: React.FC = () => (
  <Content>
    <VCol className="h-full">
      <Header />
      <Main>
        <WorkflowBasics />
        <WorkflowTriggers />
        <WorkflowEnv />
        <WorkflowPermissions />
        <WorkflowConcurrency />
        <WorkflowDefaults />
        <WorkflowJobs />
      </Main>
      <Footer />
    </VCol>
  </Content>
);

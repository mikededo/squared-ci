import React from 'react';

import { VCol } from '@/aero';

import { Content, Footer, Header, Main } from './layout';
import {
  WorkflowBasics,
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
        <WorkflowPermissions />
        <WorkflowJobs />
      </Main>
      <Footer />
    </VCol>
  </Content>
);

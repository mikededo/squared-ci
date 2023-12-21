import React from 'react';

import { VCol } from '@/aero';
import { JobDocs } from '@/editor/config';

import { EnvInput } from './env-input';
import { EnvList } from './env-list';
import { PredefinedEnv } from './predefined-env';
import { Section, SectionHeader } from '../shared';

export const EnvContent: React.FC = () => (
  <Section>
    <SectionHeader
      title="Env"
      docs={JobDocs.jobEnv}
      subtitle="Define the env variables for the job"
    />
    <VCol variant="lg" expand>
      <VCol variant="xl" expand>
        <EnvInput />
        <EnvList />
      </VCol>
      <PredefinedEnv />
    </VCol>
  </Section>
);

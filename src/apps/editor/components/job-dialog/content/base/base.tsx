import React from 'react';

import { Input, Toggle, VCol } from '@/aero';
import { JobDocs } from '@/editor/config';

import { JobName } from './job-name';
import { JobNeeds } from './job-needs';
import { Section, SectionHeader } from '../shared';

export const BaseContent: React.FC = () => (
  <VCol className="gap-6" expand>
    <JobName />
    <JobNeeds />
    {/* TODO: Add recommendations of if conditions */}
    {/* <InputSection */}
    {/*   title="Job conditions (if)" */}
    {/*   docs={JobDocs.jobIf} */}
    {/*   subtitle="Prevent a job from running unless this condition is met" */}
    {/* /> */}
    <Section>
      <SectionHeader
        title="Environment"
        docs={JobDocs.jobEnv}
        subtitle="Define the environment that the job references"
      />
      <VCol expand>
        <p className="text-sm">Name</p>
        <Input placeholder="production_environment" variant="plain" />
      </VCol>
      <VCol expand>
        <p className="text-sm">Url (optional)</p>
        <Input placeholder="https://your-domain.com" variant="plain" />
      </VCol>
    </Section>
    {/* <InputSection */}
    {/*   title="Timeout minutes" */}
    {/*   docs={JobDocs.jobTimeoutMinutes} */}
    {/*   subtitle="The maximum number of minutes to let a job run before it is automatically cancelled" */}
    {/* /> */}
    <Section>
      <SectionHeader
        title="Continue on error"
        docs={JobDocs.jobContinueOnError}
        subtitle="Prevents a workflow run from failing when a job fails."
      />
      <div className="w-full">
        <Toggle text="Enabled" value={false} onClick={console.log} />
      </div>
    </Section>
  </VCol>
);

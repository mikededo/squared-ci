import React from 'react';

import { Input, Label, Toggle, VCol } from '@/aero';
import { useSearchParam } from '@/chain';
import { JobDocs } from '@/editor/config';
import { useWorkflowJobName } from '@/editor/stores';

import { Section, SectionHeader } from './shared';

const JobName: React.FC = () => {
  const { getParam } = useSearchParam();
  const jobId = getParam('job-editor');
  const { job, onChangeJobName } = useWorkflowJobName(jobId ?? '');

  const handleOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    onChangeJobName(e.currentTarget.value);
  };

  return (
    <Section>
      <SectionHeader
        title="Job name"
        docs={JobDocs.jobName}
        subtitle="Name of the job that will be displayed in the GitHub UI"
      />
      <Input
        placeholder="job_name"
        defaultValue={job?.name ?? ''}
        onBlur={handleOnBlur}
        variant="plain"
        disabled={!jobId}
      />
    </Section>
  );
};

export const BaseContent: React.FC = () => (
  <VCol className="gap-6" expand>
    <JobName />
    <Section>
      <SectionHeader
        title="Needs"
        docs={JobDocs.jobNeeds}
        subtitle="Set up the job or list of jobs that must complete successfully before running this job"
      />
      <VCol variant="xs" expand>
        <p className="text-sm font-medium">Workflow jobs</p>
        <Label>
          You have not created any other job. Create other jobs and they will
          appear here.
        </Label>
      </VCol>
    </Section>
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

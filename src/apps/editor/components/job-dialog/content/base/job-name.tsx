import React from 'react';

import { Input } from '@/aero';
import { JobDocs } from '@/editor/config';
import { useSelectedJobId } from '@/editor/hooks';
import { useWorkflowJobName } from '@/editor/stores';

import { Section, SectionHeader } from '../shared';

export const JobName: React.FC = () => {
  const jobId = useSelectedJobId();
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

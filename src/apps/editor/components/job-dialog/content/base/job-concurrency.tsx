import React from 'react';

import { Input, Toggle, VCol } from '@/aero';
import { JobDocs } from '@/editor/config';
import { useSelectedJobId } from '@/editor/hooks';
import { useJobConcurrency } from '@/editor/stores';

import { Section, SectionHeader } from '../shared';

export const JobConcurrency: React.FC = () => {
  const jobId = useSelectedJobId();
  const { group, cancelInProgress, onChangeGroup, onToggleCIP } =
    useJobConcurrency(jobId ?? '');

  const handleOnChange = (e: React.FocusEvent<HTMLInputElement>) => {
    onChangeGroup(e.currentTarget.value);
  };

  return (
    <Section>
      <SectionHeader
        title="Concurrency"
        docs={JobDocs.jobConcurrency}
        subtitle="Define the job concurrency to ensure that only a single job or workflow using the same concurrency group run at a time"
      />
      <VCol align="between" variant="lg" expand>
        <VCol expand>
          <p className="text-xs font-semibold">Group</p>
          <Input
            placeholder="concurrency-group-name"
            defaultValue={group}
            onBlur={handleOnChange}
            variant="plain"
          />
        </VCol>
        <Toggle
          text="Cancel in progress"
          value={!!cancelInProgress}
          onClick={onToggleCIP}
        />
      </VCol>
    </Section>
  );
};

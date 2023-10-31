import React from 'react';

import { Toggle } from '@/aero';
import { JobDocs } from '@/editor/config';
import { useSelectedJobId } from '@/editor/hooks';
import { useJobContinueOnError } from '@/editor/stores';

import { Section, SectionHeader } from '../shared';

export const JobContinueOnError: React.FC = () => {
  const jobId = useSelectedJobId();
  const { value, onToggle } = useJobContinueOnError(jobId ?? '');

  return (
    <Section>
      <SectionHeader
        title="Continue on error"
        docs={JobDocs.jobContinueOnError}
        subtitle="Prevents a workflow run from failing when a job fails."
      />
      <div className="w-full">
        <Toggle
          text={value ? 'Enabled' : 'Disabled'}
          value={value ?? false}
          onClick={onToggle}
        />
      </div>
    </Section>
  );
};

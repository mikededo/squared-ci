import React from 'react';

import { Input } from '@/aero';
import { JobDocs } from '@/editor/config';
import { useSelectedJobId } from '@/editor/hooks';
import { useJobUses } from '@/editor/stores';

import { Section, SectionHeader } from '../shared';

export const JobUses: React.FC = () => {
  const jobId = useSelectedJobId();
  const { uses, onChange } = useJobUses(jobId ?? '');

  const handleOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    onChange(e.currentTarget.value);
  };

  return (
    <Section>
      <SectionHeader
        title="Uses"
        docs={JobDocs.jobUses}
        subtitle="Location of a reusable workflow file to be run as a job."
      />
      <Input
        variant="plain"
        placeholder="./.github/workflows/{filename}"
        defaultValue={uses}
        onBlur={handleOnBlur}
      />
    </Section>
  );
};

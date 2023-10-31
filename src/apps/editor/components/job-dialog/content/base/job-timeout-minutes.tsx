import React from 'react';

import { Input } from '@/aero';
import { JobDocs } from '@/editor/config';
import { useAdvancedInput, useSelectedJobId } from '@/editor/hooks';
import { useJobTimeoutMinutes } from '@/editor/stores';

import { Section, SectionHeader } from '../shared';

export const JobTimeoutMinutes: React.FC = () => {
  const jobId = useSelectedJobId();
  const { minutes, onChange } = useJobTimeoutMinutes(jobId ?? '');
  const methods = useAdvancedInput(`${minutes}`, {
    numOnly: true,
    onBlur: (value, { onResetInput }) => {
      const parsed = Math.min(360, Math.max(0, parseInt(value, 10)));
      onChange(Number.isNaN(parsed) ? 360 : parsed);
      onResetInput(`${Number.isNaN(parsed) ? 360 : parsed}`);
    },
  });

  return (
    <Section>
      <SectionHeader
        title="If (conditon)"
        docs={JobDocs.jobTimeoutMinutes}
        subtitle="The maximum number of minutes to let a job run before GitHub automatically cancels it. Default set to 360."
      />
      <Input variant="plain" type="number" {...methods} />
    </Section>
  );
};

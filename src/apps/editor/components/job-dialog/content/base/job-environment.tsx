import React from 'react';

import { Input, VCol } from '@/aero';
import { JobDocs } from '@/editor/config';
import { useAdvancedInput, useSelectedJobId } from '@/editor/hooks';
import { useWorkflowEnvironment } from '@/editor/stores';

import { Section, SectionHeader } from '../shared';

export const JobEnvironment: React.FC = () => {
  const jobId = useSelectedJobId();
  const { environment, onChangeName, onChangeUrl } = useWorkflowEnvironment(
    jobId ?? '',
  );

  const nameMethods = useAdvancedInput(environment?.name ?? '', {
    spaceAsUnderscore: true,
    preventUppercase: true,
  });
  const urlMethods = useAdvancedInput(environment?.url ?? '', {
    disableSpaces: true,
    preventUppercase: true,
  });

  const handleOnBlur =
    (effect: typeof onChangeName) =>
    (e: React.FocusEvent<HTMLInputElement>) => {
      effect(e.target.value);
    };

  return (
    <Section>
      <SectionHeader
        title="Environment"
        docs={JobDocs.jobEnv}
        subtitle="Define the environment that the job references"
      />
      <VCol expand>
        <p className="text-sm">Name</p>
        <Input
          placeholder="production_environment"
          variant="plain"
          onBlur={handleOnBlur(onChangeName)}
          {...nameMethods}
        />
      </VCol>
      <VCol expand>
        <p className="text-sm">Url (optional)</p>
        <Input
          placeholder="https://your-domain.com"
          variant="plain"
          onBlur={handleOnBlur(onChangeUrl)}
          {...urlMethods}
        />
      </VCol>
    </Section>
  );
};

import React from 'react';

import { Button, Chip, ChipWrapper, Input, Row, VCol } from '@/aero';
import { JobDocs } from '@/editor/config';
import { useAdvancedInput, useSelectedJobId } from '@/editor/hooks';
import { useJobsWith } from '@/editor/stores';

import { Section, SectionHeader } from '../shared';

const renderValue = (value: string) => {
  if (!value.includes(' ')) {
    return value;
  }

  return `"${value}"`;
};

export const JobWith: React.FC = () => {
  const jobId = useSelectedJobId();
  const { enabled, entries, onAdd, onRemove } = useJobsWith(jobId ?? '');

  const [idMethods, idHelpers] = useAdvancedInput('', {
    spaceAsUnderscore: true,
  });
  const [valueMethods, valueHelpers] = useAdvancedInput('', {});

  const handleOnAdd = () => {
    onAdd([idMethods.value.trim(), valueMethods.value.trim()]);
    idHelpers.onResetInput();
    valueHelpers.onResetInput();
  };

  const handleOnRemove = (key: string) => () => {
    onRemove(key);
  };

  const validEntry = !!(idMethods.value && valueMethods.value);

  return (
    <Section>
      <SectionHeader
        title="With"
        docs={JobDocs.jobId}
        subtitle={`Map of variables that will be passed to the reusable workflow. Only available if ${jobId}.uses is set`}
      />
      {entries?.size ? (
        <ChipWrapper variant="left" expand>
          {[...entries].map(([key, value]) => (
            <Chip
              key={key}
              text={`${key}=${renderValue(value)}`}
              onClick={handleOnRemove(key)}
              active
            />
          ))}
        </ChipWrapper>
      ) : null}
      <Row expand>
        <VCol expand>
          <p className="text-xs font-semibold">Input id</p>
          <Input
            variant="plain"
            placeholder="username"
            disabled={!enabled}
            {...idMethods}
          />
        </VCol>
        <VCol expand>
          <p className="text-xs font-semibold">Input value</p>
          <Input
            variant="plain"
            placeholder="github-username"
            disabled={!enabled}
            {...valueMethods}
          />
        </VCol>
      </Row>
      <Button
        type="submit"
        variant="text"
        className="self-end"
        disabled={!(enabled && validEntry)}
        onClick={handleOnAdd}
        condensed
      >
        Add entry
      </Button>
    </Section>
  );
};

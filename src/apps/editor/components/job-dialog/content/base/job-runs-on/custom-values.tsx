import React from 'react';

import { Button, Chip, ChipWrapper, Input } from '@/aero';
import { useAdvancedInput, useSelectedJobId } from '@/editor/hooks';
import { useJobRunsOnActive, useJobRunsOnCustom } from '@/editor/stores';

import { SectionHeader } from '../../shared';

const PLACEHOLDER: Record<number, string> = {
  0: 'self_hosted',
  1: 'linux',
  2: 'x64',
  3: 'gpu',
};

export const CustomValues: React.FC = () => {
  const jobId = useSelectedJobId();
  const { custom, onToggle, onClear } = useJobRunsOnCustom(jobId ?? '');
  const active = useJobRunsOnActive(jobId ?? '') === 'custom';

  const [methods, { onResetInput }] = useAdvancedInput('', {
    spaceAsUnderscore: true,
    preventUppercase: true,
    onEnterPress: (value, { onResetInput }) => {
      onToggle(value);
      onResetInput();
    },
  });

  const handleOnAddValue = () => {
    onToggle(methods.value);
    onResetInput();
  };

  const handleOnClick = (value: string) => () => {
    onToggle(value);
  };

  return (
    <>
      <SectionHeader
        as="h5"
        title="Custom runner values"
        subtitle="Specify a set of strings or variables. The workflow will execute on any runner that matches all of the specified values. Press enter to add a new value."
        headerLabel={active ? 'Active' : undefined}
      />
      {custom?.size ? (
        <ChipWrapper variant="left" expand>
          {[...custom].map((value) => (
            <Chip
              key={value}
              text={value}
              onClick={handleOnClick(value)}
              active
            />
          ))}
        </ChipWrapper>
      ) : null}
      <Input
        variant="plain"
        {...methods}
        placeholder={PLACEHOLDER[custom?.size ?? 0] ?? 'other_labels'}
        button="Add"
        buttonDisabled={!methods.value}
        onButtonClick={handleOnAddValue}
      />
      <Button
        variant="text"
        className="self-end"
        disabled={!custom?.size}
        onClick={onClear}
        condensed
      >
        Clear
      </Button>
    </>
  );
};

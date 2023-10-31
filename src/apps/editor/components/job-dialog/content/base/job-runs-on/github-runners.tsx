import React from 'react';

import { Button, Select } from '@/aero';
import type { GitHubHostedRunners } from '@/editor/domain/runners';
import { RunnersMap } from '@/editor/domain/runners';
import { useSelectedJobId } from '@/editor/hooks';
import { useJobRunsOnActive, useJobRunsOnGithubRunner } from '@/editor/stores';

import { SectionHeader } from '../../shared';

export const GithubRunners: React.FC = () => {
  const jobId = useSelectedJobId();
  const { runner, onChange, onClear } = useJobRunsOnGithubRunner(jobId ?? '');
  const active = useJobRunsOnActive(jobId ?? '') === 'github-runner';

  const handleOnOptionClick = (option: GitHubHostedRunners) => {
    onChange(option);
  };

  return (
    <>
      <SectionHeader
        as="h5"
        title="GitHub hosted runners"
        subtitle="Runner images provided by GitHub."
        headerLabel={active ? 'Active' : undefined}
      />
      <Select
        options={RunnersMap}
        defaultValue={runner ? RunnersMap[runner] : undefined}
        inputProps={{
          placeholder: 'GitHub hosted runners',
          variant: 'plain',
        }}
        onClickOption={handleOnOptionClick}
        filter
      />
      <Button
        variant="text"
        className="self-end"
        disabled={!runner}
        onClick={onClear}
        condensed
      >
        Clear
      </Button>
    </>
  );
};

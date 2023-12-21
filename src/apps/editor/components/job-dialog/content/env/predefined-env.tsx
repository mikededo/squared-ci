import React from 'react';

import { Label, Tag, TagWrapper, VCol } from '@/aero';
import { useSelectedJobId } from '@/editor/hooks';
import { useJobEnv } from '@/editor/stores';

const PREDEFINED_KEYS = {
  GITHUB_ACTOR: '${{ github.actor }}',
  GITHUB_ENV: '${{ github.workspace }}/.env',
  GITHUB_EVENT_NAME: '${{ github.event_name }}',
  GITHUB_REF: '${{ github.ref }}',
  GITHUB_REPOSITORY: '${{ github.repository }}',
  GITHUB_SHA: '${{ github.sha }}',
  GITHUB_TOKEN: '${{ secrets.GITHUB_TOKEN }}',
  GITHUB_WORKSPACE: '${{ github.workspace }}',
  RUNNER_OS: '${{ runner.os }}',
  RUNNER_TOOL_CACHE: '${{ runner.tool_cache }}',
};

export const PredefinedEnv: React.FC = () => {
  const jobId = useSelectedJobId();
  const { env, onAddEnv } = useJobEnv(jobId ?? '');

  const handleOnClickPredefined = (key: string, value: string) => () => {
    onAddEnv(key, value);
  };

  const isPrederefinedSelected = (key: string) => env && env.has(key);

  return (
    <VCol variant="lg">
      <h5 className="font-semibold">Commonly used env keys</h5>
      <Label>
        In need of inspirations? Here are some templates to help you out
      </Label>
      <TagWrapper>
        {Object.entries(PREDEFINED_KEYS).map(([key, value]) => (
          <Tag
            key={key}
            text={`${key}=${value}`}
            disabled={isPrederefinedSelected(key)}
            onClick={handleOnClickPredefined(key, value)}
          />
        ))}
      </TagWrapper>
    </VCol>
  );
};

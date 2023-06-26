import React from 'react';

import { Chip } from '@/components';

import { ChipWrapper } from '../chip-wrapper';
import { Trigger } from '../types';

type Props = {
  trigger: Trigger;
  selected: string[];
  onTypeToggle: (type: string) => void;
};

const TriggerTypes: { [k in Trigger]?: string[] } = {
  check_run: ['created', 'deleted', 'updated'],
  check_suite: ['created', 'deleted', 'updated'],
  discussion: ['created', 'deleted', 'updated'],
  discussion_comment: ['created', 'deleted', 'updated'],
  issue_comment: ['created', 'deleted', 'updated'],
  issues: ['created', 'deleted', 'updated'],
  label: ['created', 'deleted', 'updated'],
  merge_group: ['created', 'deleted', 'updated'],
  milestone: ['created', 'deleted', 'updated'],
  page_build: ['created', 'deleted', 'updated'],
  project: ['created', 'deleted', 'updated'],
  project_card: ['created', 'deleted', 'updated'],
  project_column: ['created', 'deleted', 'updated'],
  pull_request: ['created', 'deleted', 'updated'],
  pull_request_comment: ['created', 'deleted', 'updated'],
  pull_request_review: ['created', 'deleted', 'updated'],
  pull_request_review_comment: ['created', 'deleted', 'updated'],
  pull_request_target: ['created', 'deleted', 'updated'],
  registry_package: ['created', 'deleted', 'updated'],
  release: ['created', 'deleted', 'updated'],
  watch: ['created', 'deleted', 'updated'],
  workflow_run: ['created', 'deleted', 'updated'],
};

export const Types: React.FC<Props> = ({ trigger, selected, onTypeToggle }) => {
  const handleOnTypeToggle = (type: string) => () => {
    onTypeToggle(type);
  };

  const types = TriggerTypes[trigger];
  if (types === undefined) {
    return null;
  }

  return (
    <ChipWrapper>
      {types.map((type) => (
        <Chip
          key={type}
          text={type}
          active={selected.includes(type)}
          onClick={handleOnTypeToggle(type)}
        />
      ))}
    </ChipWrapper>
  );
};

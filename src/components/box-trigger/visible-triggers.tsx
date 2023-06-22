import {
  CommentIcon,
  GitPullRequestIcon,
  IssueOpenedIcon,
  PackageIcon,
  RepoForkedIcon,
  RepoPushIcon,
  ZapIcon,
} from '@primer/octicons-react';
import React from 'react';

import { Icon } from '@/components';

import type { IconGroupProps, Trigger } from './types';

export const VisibleTriggers: React.FC<IconGroupProps> = ({
  selected,
  onIconClick,
}) => {
  const handleOnClick = (trigger: Trigger) => () => {
    onIconClick(trigger);
  };

  return (
    <div className="grid grid-cols-4 grid-flow-row-dense gap-1 justify-between">
      <Icon
        selected={selected === 'pull_request'}
        onClick={handleOnClick('pull_request')}
      >
        <GitPullRequestIcon />
      </Icon>
      <Icon
        selected={selected === 'workflow_dispatch'}
        onClick={handleOnClick('workflow_dispatch')}
      >
        <ZapIcon />
      </Icon>
      <Icon selected={selected === 'push'} onClick={handleOnClick('push')}>
        <RepoPushIcon />
      </Icon>
      <Icon selected={selected === 'issues'} onClick={handleOnClick('issues')}>
        <IssueOpenedIcon />
      </Icon>
      <Icon
        selected={selected === 'issue_comment'}
        onClick={handleOnClick('issue_comment')}
      >
        <CommentIcon />
      </Icon>
      <Icon selected={selected === 'fork'} onClick={handleOnClick('fork')}>
        <RepoForkedIcon />
      </Icon>
      <Icon
        selected={selected === 'release'}
        onClick={handleOnClick('release')}
      >
        <PackageIcon />
      </Icon>
    </div>
  );
};

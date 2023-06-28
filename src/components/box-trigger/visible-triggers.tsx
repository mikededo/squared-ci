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
import { Trigger } from '@/domain/trigger';

type IconGroupProps = {
  selected: Trigger | null;
  onIconClick: (trigger: Trigger) => void;
};

type TriggerItem = {
  key: Trigger;
  icon: React.ReactNode;
};

const Triggers: TriggerItem[] = [
  { key: 'pull_request', icon: <GitPullRequestIcon /> },
  { key: 'workflow_dispatch', icon: <ZapIcon /> },
  { key: 'push', icon: <RepoPushIcon /> },
  { key: 'issues', icon: <IssueOpenedIcon /> },
  { key: 'issue_comment', icon: <CommentIcon /> },
  { key: 'fork', icon: <RepoForkedIcon /> },
  { key: 'release', icon: <PackageIcon /> },
];

export const VisibleTriggers: React.FC<IconGroupProps> = ({
  selected,
  onIconClick,
}) => {
  const handleOnClick = (trigger: Trigger) => () => {
    onIconClick(trigger);
  };

  return (
    <div className="grid grid-cols-4 grid-flow-row-dense gap-1 justify-between">
      {Triggers.map(({ key, icon }) => (
        <Icon
          key={key}
          selected={selected === key}
          onClick={handleOnClick(key)}
        >
          {icon}
        </Icon>
      ))}
    </div>
  );
};

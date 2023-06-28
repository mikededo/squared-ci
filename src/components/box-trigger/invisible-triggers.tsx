import {
  BrowserIcon,
  CalendarIcon,
  ChecklistIcon,
  ClockIcon,
  CodescanCheckmarkIcon,
  ColumnsIcon,
  CommentDiscussionIcon,
  CommentIcon,
  CrossReferenceIcon,
  DiffAddedIcon,
  DiffRemovedIcon,
  EyeIcon,
  GitMergeIcon,
  GoalIcon,
  IdBadgeIcon,
  InboxIcon,
  MegaphoneIcon,
  MilestoneIcon,
  NoteIcon,
  PackageDependentsIcon,
  ProjectIcon,
  PulseIcon,
  RepoIcon,
  RocketIcon,
  SmileyIcon,
  TagIcon,
  TelescopeIcon,
} from '@primer/octicons-react';
import React from 'react';

import { Icon } from '@/components';
import type { Trigger } from '@/domain/trigger';

type IconGroupProps = {
  selected: Set<Trigger>;
  onIconClick: (trigger: Trigger) => void;
};

type TriggerItem = {
  key: Trigger;
  icon: React.ReactNode;
};
const Triggers: TriggerItem[] = [
  { key: 'check_run', icon: <CodescanCheckmarkIcon /> },
  { key: 'check_suite', icon: <ChecklistIcon /> },
  { key: 'create', icon: <DiffAddedIcon /> },
  { key: 'delete', icon: <DiffRemovedIcon /> },
  { key: 'deployment', icon: <RocketIcon /> },
  { key: 'deployment_status', icon: <ClockIcon /> },
  { key: 'discussion', icon: <InboxIcon /> },
  { key: 'discussion_comment', icon: <CommentDiscussionIcon /> },
  { key: 'gollum', icon: <SmileyIcon /> },
  { key: 'label', icon: <TagIcon /> },
  { key: 'merge_group', icon: <GitMergeIcon /> },
  { key: 'milestone', icon: <MilestoneIcon /> },
  { key: 'page_build', icon: <BrowserIcon /> },
  { key: 'project', icon: <ProjectIcon /> },
  { key: 'project_card', icon: <NoteIcon /> },
  { key: 'project_column', icon: <ColumnsIcon /> },
  { key: 'public', icon: <EyeIcon /> },
  { key: 'pull_request_comment', icon: <CommentIcon /> },
  { key: 'pull_request_review', icon: <CrossReferenceIcon /> },
  { key: 'pull_request_review_comment', icon: <NoteIcon /> },
  { key: 'pull_request_target', icon: <GoalIcon /> },
  { key: 'registry_package', icon: <PackageDependentsIcon /> },
  { key: 'repository_dispatch', icon: <RepoIcon /> },
  { key: 'schedule', icon: <CalendarIcon /> },
  { key: 'status', icon: <PulseIcon /> },
  { key: 'watch', icon: <TelescopeIcon /> },
  { key: 'workflow_call', icon: <MegaphoneIcon /> },
  { key: 'workflow_run', icon: <IdBadgeIcon /> },
];

export const InvisibleTriggers: React.FC<IconGroupProps> = ({
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
          selected={selected.has(key)}
          onClick={handleOnClick(key)}
        >
          {icon}
        </Icon>
      ))}
    </div>
  );
};

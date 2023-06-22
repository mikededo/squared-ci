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

import type { IconGroupProps, Trigger } from './types';

export const InvisibleTriggers: React.FC<IconGroupProps> = ({
  selected,
  onIconClick,
}) => {
  const handleOnClick = (trigger: Trigger) => () => {
    onIconClick(trigger);
  };

  return (
    <div className="grid grid-cols-4 grid-flow-row-dense gap-1 justify-between">
      <Icon
        selected={selected === 'check_run'}
        onClick={handleOnClick('check_run')}
      >
        <CodescanCheckmarkIcon />
      </Icon>
      <Icon
        selected={selected === 'check_suite'}
        onClick={handleOnClick('check_suite')}
      >
        <ChecklistIcon />
      </Icon>
      <Icon selected={selected === 'create'} onClick={handleOnClick('create')}>
        <DiffAddedIcon />
      </Icon>
      <Icon selected={selected === 'delete'} onClick={handleOnClick('delete')}>
        <DiffRemovedIcon />
      </Icon>
      <Icon
        selected={selected === 'deployment'}
        onClick={handleOnClick('deployment')}
      >
        <RocketIcon />
      </Icon>
      <Icon
        selected={selected === 'deployment_status'}
        onClick={handleOnClick('deployment_status')}
      >
        <ClockIcon />
      </Icon>
      <Icon
        selected={selected === 'discussion'}
        onClick={handleOnClick('discussion')}
      >
        <InboxIcon />
      </Icon>
      <Icon
        selected={selected === 'discussion_comment'}
        onClick={handleOnClick('discussion_comment')}
      >
        <CommentDiscussionIcon />
      </Icon>
      <Icon selected={selected === 'gollum'} onClick={handleOnClick('gollum')}>
        <SmileyIcon />
      </Icon>
      <Icon selected={selected === 'label'} onClick={handleOnClick('label')}>
        <TagIcon />
      </Icon>
      <Icon
        selected={selected === 'merge_group'}
        onClick={handleOnClick('merge_group')}
      >
        <GitMergeIcon />
      </Icon>
      <Icon
        selected={selected === 'milestone'}
        onClick={handleOnClick('milestone')}
      >
        <MilestoneIcon />
      </Icon>
      <Icon
        selected={selected === 'page_build'}
        onClick={handleOnClick('page_build')}
      >
        <BrowserIcon />
      </Icon>
      <Icon
        selected={selected === 'project'}
        onClick={handleOnClick('project')}
      >
        <ProjectIcon />
      </Icon>
      <Icon
        selected={selected === 'project_card'}
        onClick={handleOnClick('project_card')}
      >
        <NoteIcon />
      </Icon>
      <Icon
        selected={selected === 'project_column'}
        onClick={handleOnClick('project_column')}
      >
        <ColumnsIcon />
      </Icon>
      <Icon selected={selected === 'public'} onClick={handleOnClick('public')}>
        <EyeIcon />
      </Icon>
      <Icon
        selected={selected === 'pull_request_comment'}
        onClick={handleOnClick('pull_request_comment')}
      >
        <CommentIcon />
      </Icon>
      <Icon
        selected={selected === 'pull_request_review'}
        onClick={handleOnClick('pull_request_review')}
      >
        <CrossReferenceIcon />
      </Icon>
      <Icon
        selected={selected === 'pull_request_review_comment'}
        onClick={handleOnClick('pull_request_review_comment')}
      >
        <NoteIcon />
      </Icon>
      <Icon
        selected={selected === 'pull_request_target'}
        onClick={handleOnClick('pull_request_target')}
      >
        <GoalIcon />
      </Icon>
      <Icon
        selected={selected === 'registry_package'}
        onClick={handleOnClick('registry_package')}
      >
        <PackageDependentsIcon />
      </Icon>
      <Icon
        selected={selected === 'repository_dispatch'}
        onClick={handleOnClick('repository_dispatch')}
      >
        <RepoIcon />
      </Icon>
      <Icon
        selected={selected === 'schedule'}
        onClick={handleOnClick('schedule')}
      >
        <CalendarIcon />
      </Icon>
      <Icon selected={selected === 'status'} onClick={handleOnClick('status')}>
        <PulseIcon />
      </Icon>
      <Icon selected={selected === 'watch'} onClick={handleOnClick('watch')}>
        <TelescopeIcon />
      </Icon>
      <Icon
        selected={selected === 'workflow_call'}
        onClick={handleOnClick('workflow_call')}
      >
        <MegaphoneIcon />
      </Icon>
      <Icon
        selected={selected === 'workflow_run'}
        onClick={handleOnClick('workflow_run')}
      >
        <IdBadgeIcon />
      </Icon>
    </div>
  );
};

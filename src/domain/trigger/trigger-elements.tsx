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
  GitPullRequestIcon,
  GoalIcon,
  IdBadgeIcon,
  InboxIcon,
  IssueOpenedIcon,
  MegaphoneIcon,
  MilestoneIcon,
  NoteIcon,
  PackageDependentsIcon,
  PackageIcon,
  ProjectIcon,
  PulseIcon,
  RepoForkedIcon,
  RepoIcon,
  RepoPushIcon,
  RocketIcon,
  SmileyIcon,
  TagIcon,
  TelescopeIcon,
  ZapIcon,
} from '@primer/octicons-react';
import React from 'react';

import type { Trigger } from './trigger';

export type TriggerItem = {
  key: Trigger;
  icon: React.ReactNode;
};

export const VisibleTriggers: TriggerItem[] = [
  { key: 'pull_request', icon: <GitPullRequestIcon /> },
  { key: 'workflow_dispatch', icon: <ZapIcon /> },
  { key: 'push', icon: <RepoPushIcon /> },
  { key: 'issues', icon: <IssueOpenedIcon /> },
  { key: 'issue_comment', icon: <CommentIcon /> },
  { key: 'fork', icon: <RepoForkedIcon /> },
  { key: 'release', icon: <PackageIcon /> },
];

export const InvisibleTriggers: TriggerItem[] = [
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

export type IconGroupProps = {
  selected: Trigger | null;
  onIconClick: (trigger: Trigger) => void;
};

export type Trigger =
  | 'check_run'
  | 'check_suite'
  | 'create'
  | 'delete'
  | 'deployment'
  | 'deployment_status'
  | 'discussion'
  | 'discussion_comment'
  | 'fork' // visible
  | 'gollum'
  | 'issue_comment' // visible
  | 'issues' // visible
  | 'label'
  | 'merge_group'
  | 'milestone'
  | 'page_build'
  | 'project'
  | 'project_card'
  | 'project_column'
  | 'public'
  | 'pull_request' // visible
  | 'pull_request_comment'
  | 'pull_request_review'
  | 'pull_request_review_comment'
  | 'pull_request_target'
  | 'push' // visible
  | 'registry_package'
  | 'release' // visible
  | 'repository_dispatch'
  | 'schedule'
  | 'status'
  | 'watch'
  | 'workflow_call'
  | 'workflow_dispatch' // visible
  | 'workflow_run';

type Customization = 'none' | 'types' | 'custom-types' | 'cron' | 'tbd';
export const TriggerCustomization: Record<Trigger, Customization> = {
  check_run: 'types',
  check_suite: 'types',
  create: 'none',
  delete: 'none',
  deployment: 'none',
  deployment_status: 'none',
  discussion: 'types',
  discussion_comment: 'types',
  fork: 'none',
  gollum: 'none',
  issue_comment: 'types',
  issues: 'types',
  label: 'types',
  merge_group: 'types',
  milestone: 'types',
  page_build: 'types',
  project: 'types',
  project_card: 'types',
  project_column: 'types',
  public: 'none',
  pull_request: 'types',
  pull_request_comment: 'types',
  pull_request_review: 'types',
  pull_request_review_comment: 'types',
  pull_request_target: 'types',
  push: 'tbd',
  registry_package: 'types',
  release: 'types',
  repository_dispatch: 'custom-types',
  schedule: 'cron',
  status: 'none',
  watch: 'types',
  workflow_call: 'none',
  workflow_dispatch: 'none',
  workflow_run: 'types',
};

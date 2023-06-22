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

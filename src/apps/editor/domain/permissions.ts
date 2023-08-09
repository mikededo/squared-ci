export type Permissions =
  | 'actions'
  | 'checks'
  | 'contents'
  | 'deployments'
  | 'discussions'
  | 'id-token'
  | 'issues'
  | 'packages'
  | 'pages'
  | 'pull-requests'
  | 'repository-projects'
  | 'security-events'
  | 'statuses';
export type PermissionStatus = 'none' | 'read' | 'write';
export type ExtraPermissionStatuses = 'read-all' | 'write-all' | '{}';

export const PermissionsList: Permissions[] = [
  'actions',
  'checks',
  'contents',
  'deployments',
  'discussions',
  'id-token',
  'issues',
  'packages',
  'pages',
  'pull-requests',
  'repository-projects',
  'security-events',
  'statuses',
];

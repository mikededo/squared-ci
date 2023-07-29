export type Cron = [string, string, string, string, string];
export const DefaultCronValue: Cron = ['*', '*', '*', '*', '*'];

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

export type Customization =
  | 'none'
  | 'types'
  | 'types-branches-paths'
  | 'types-branches-tags'
  | 'custom-types'
  | 'cron';
export const TriggerCustomization = {
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
  page_build: 'none',
  project: 'types',
  project_card: 'types',
  project_column: 'types',
  public: 'none',
  pull_request: 'types-branches-paths',
  pull_request_comment: 'types',
  pull_request_review: 'types',
  pull_request_review_comment: 'types',
  pull_request_target: 'types-branches-tags',
  push: 'types-branches-paths',
  registry_package: 'types',
  release: 'types',
  repository_dispatch: 'custom-types',
  schedule: 'cron',
  status: 'none',
  watch: 'types',
  workflow_call: 'none',
  workflow_dispatch: 'none',
  workflow_run: 'types',
} as const;
export type TriggerCustomizationType = typeof TriggerCustomization;
export type TriggerCustomizationKeys = keyof TriggerCustomizationType;

type CustomizationKeys<T extends Customization> = {
  [K in TriggerCustomizationKeys]: TriggerCustomizationType[K] extends T
    ? K
    : never;
}[TriggerCustomizationKeys];
export type NoneCustomizationKeys = CustomizationKeys<'none'>;
export type TypesCustomizationKeys = CustomizationKeys<'types'>;
export type CustomTypesCustomizationKeys = CustomizationKeys<'custom-types'>;
export type ComplexTypesCustomizationKeys = CustomizationKeys<
  'types-branches-paths' | 'types-branches-tags'
>;
export type ComplexBranchesCustomizationKeys = CustomizationKeys<
  'types-branches-paths' | 'types-branches-tags'
>;
export type ComplexPathCustomizationKeys =
  CustomizationKeys<'types-branches-paths'>;
export type ComplexTagsCustomizationKeys =
  CustomizationKeys<'types-branches-tags'>;
export type CronCustomizationKeys = CustomizationKeys<'cron'>;

export const NoneCustomizations = Object.entries(TriggerCustomization).reduce(
  (res, [key, value]) => ({ ...res, [key]: value === 'none' }),
  {}
) as NoneCustomizationKeys;
export const TypesCustomizations = Object.entries(TriggerCustomization).reduce(
  (res, [key, value]) => ({ ...res, [key]: value === 'types' }),
  {}
) as TypesCustomizationKeys;
export const CustomTypesCustomizations = Object.entries(
  TriggerCustomization
).reduce(
  (res, [key, value]) => ({ ...res, [key]: value === 'custom-types' }),
  {}
) as CustomTypesCustomizationKeys;
export const CronCustomizations = Object.entries(TriggerCustomization).reduce(
  (res, [key, value]) => ({ ...res, [key]: value === 'cron' }),
  {}
) as CronCustomizationKeys;

export const isNoneCustomization = (
  trigger: Trigger
): trigger is NoneCustomizationKeys => TriggerCustomization[trigger] === 'none';
export const isComplexCustomization = (
  trigger: Trigger
): trigger is ComplexTypesCustomizationKeys => {
  const triggerType = TriggerCustomization[trigger];
  return (
    triggerType === 'types-branches-tags' ||
    triggerType === 'types-branches-paths'
  );
};
export const isTypeCustomization = (
  trigger: Trigger
): trigger is
  | TypesCustomizationKeys
  | CustomTypesCustomizationKeys
  | ComplexTypesCustomizationKeys => {
  const triggerType = TriggerCustomization[trigger];
  return (
    triggerType === 'types' ||
    triggerType === 'custom-types' ||
    isComplexCustomization(trigger)
  );
};
export const isCronCustomization = (
  trigger: Trigger
): trigger is CronCustomizationKeys => TriggerCustomization[trigger] === 'cron';

export const BaseTriggerTypes = ['created', 'edited', 'deleted'];
export const PullRequestTypes = [
  'assigned',
  'unassigned',
  'labeled',
  'unlabeled',
  'opened',
  'edited',
  'closed',
  'reopened',
  'synchronize',
  'converted_to_draft',
  'ready_for_review',
  'locked',
  'unlocked',
  'review_requested',
  'review_requested_removed',
  'auto_merge_enabled',
  'auto_merge_disabled',
];

export const TriggerTypes: { [k in Trigger]?: string[] } = {
  check_run: ['created', 'rerequested', 'completed', 'requested_action'],
  check_suite: ['completed'],
  discussion: [
    ...BaseTriggerTypes,
    'transferred',
    'pinned',
    'unpinned',
    'labeled',
    'unlabeled',
    'locked',
    'unlocked',
    'category_changed',
    'answered',
    'unanswered',
  ],
  discussion_comment: BaseTriggerTypes,
  issue_comment: BaseTriggerTypes,
  issues: [
    'opened',
    'edited',
    'deleted',
    'transferred',
    'pinned',
    'unpinned',
    'closed',
    'reopened',
    'assigned',
    'unassigned',
    'labeled',
    'unlabeled',
    'locked',
    'unlocked',
    'milestoned',
    'demilestoned',
  ],
  label: BaseTriggerTypes,
  merge_group: ['checks_requested'],
  milestone: [...BaseTriggerTypes, 'closed', 'opened'],
  project: [...BaseTriggerTypes, 'closed', 'opened'],
  project_card: [...BaseTriggerTypes, 'moved', 'converted'],
  project_column: ['created', 'deleted', 'updated', 'moved'],
  pull_request: PullRequestTypes,
  pull_request_comment: BaseTriggerTypes,
  pull_request_review: ['submitted', 'edited', 'dismissed'],
  pull_request_review_comment: BaseTriggerTypes,
  pull_request_target: PullRequestTypes,
  registry_package: ['published', 'updated'],
  release: [
    'published',
    'unpublished',
    'created',
    'edited',
    'deleted',
    'prereleased',
    'released',
  ],
  watch: ['starred'],
  workflow_run: ['completed', 'requested', 'in_progress'],
};

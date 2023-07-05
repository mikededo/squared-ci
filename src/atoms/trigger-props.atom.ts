import { atom } from 'jotai';

import type { Equals } from '@/domain/shared';
import type {
  Customization,
  Trigger,
  TriggerCustomization,
  TriggerCustomizationKeys,
  TriggerCustomizationType,
} from '@/domain/trigger';

type TriggerStateConfiguration = {
  [K in Trigger]: Equals<(typeof TriggerCustomization)[K], 'none'> extends true
    ? null
    : Equals<(typeof TriggerCustomization)[K], 'types'> extends true
    ? Set<string>
    : Equals<(typeof TriggerCustomization)[K], 'custom-types'> extends true
    ? Set<string>
    : Equals<(typeof TriggerCustomization)[K], 'tbd'> extends true
    ? Map<unknown, unknown>
    : Equals<(typeof TriggerCustomization)[K], 'cron'> extends true
    ? [string, string, string, string, string]
    : null;
};
type TriggerStateUpdaterValue<T extends Customization> = Equals<
  T,
  'none'
> extends true
  ? null
  : Equals<T, 'types'> extends true
  ? string
  : Equals<T, 'custom-types'> extends true
  ? string
  : Equals<T, 'tbd'> extends true
  ? string
  : Equals<T, 'cron'> extends true
  ? [string, string, string, string, string]
  : null;
export type TriggerStateUpdater = {
  [K in TriggerCustomizationKeys]: [
    K,
    TriggerStateUpdaterValue<TriggerCustomizationType[K]>
  ];
}[TriggerCustomizationKeys];

const TriggerBaseState: TriggerStateConfiguration = {
  check_run: new Set(),
  check_suite: new Set(),
  create: null,
  delete: null,
  deployment: null,
  deployment_status: null,
  discussion: new Set(),
  discussion_comment: new Set(),
  fork: null,
  gollum: null,
  issue_comment: new Set(),
  issues: new Set(),
  label: new Set(),
  merge_group: new Set(),
  milestone: new Set(),
  page_build: null,
  project: new Set(),
  project_card: new Set(),
  project_column: new Set(),
  public: null,
  pull_request: new Set(),
  pull_request_comment: new Set(),
  pull_request_review: new Set(),
  pull_request_review_comment: new Set(),
  pull_request_target: new Set(),
  push: new Map(),
  registry_package: new Set(),
  release: new Set(),
  repository_dispatch: new Set(),
  schedule: ['*', '*', '*', '*', '*'],
  status: null,
  watch: new Set(),
  workflow_call: null,
  workflow_dispatch: null,
  workflow_run: new Set(),
};

export const triggerPropsAtom = () => {
  const base = atom(TriggerBaseState);
  const derived = atom<TriggerStateConfiguration, TriggerStateUpdater[], void>(
    (get) => get(base),
    (get, set, [trigger, updateValue]) => {
      const current = get(base);

      switch (trigger) {
        case 'check_run':
        case 'check_suite':
        case 'discussion':
        case 'discussion_comment':
        case 'issue_comment':
        case 'issues':
        case 'label':
        case 'merge_group':
        case 'milestone':
        case 'project':
        case 'project_card':
        case 'project_column':
        case 'pull_request':
        case 'pull_request_comment':
        case 'pull_request_review':
        case 'pull_request_review_comment':
        case 'pull_request_target':
        case 'registry_package':
        case 'release':
        case 'watch':
        case 'workflow_run':
        case 'repository_dispatch': {
          const currentValue = new Set([...current[trigger]]);
          if (currentValue.has(updateValue)) {
            currentValue.delete(updateValue);
          } else {
            currentValue.add(updateValue);
          }

          set(base, { ...current, [trigger]: currentValue });
          return;
        }
        case 'push':
          // TBD:
          return;
        case 'schedule':
          set(base, { ...current, [trigger]: updateValue });
          return;
        case 'create':
        case 'delete':
        case 'deployment':
        case 'deployment_status':
        case 'fork':
        case 'gollum':
        case 'page_build':
        case 'public':
        case 'status':
        case 'workflow_call':
        case 'workflow_dispatch':
        default:
          return;
      }
    }
  );

  return derived;
};

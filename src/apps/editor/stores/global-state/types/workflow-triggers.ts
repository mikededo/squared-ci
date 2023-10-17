import type {
  ComplexBranchesCustomizationKeys,
  ComplexPathsCustomizationKeys,
  ComplexTagsCustomizationKeys,
  ComplexTypesCustomizationKeys,
  Cron,
  CronCustomizationKeys,
  CustomTypesCustomizationKeys,
  NoneCustomizationKeys,
  Trigger,
  TypesCustomizationKeys,
} from '@/editor/domain/trigger';

import type { Double, Empty, Single, Triple } from './shared';

export type ComplexTypeCustomizationProps =
  | 'types'
  | 'branches'
  | 'branches-ignore'
  | 'tags'
  | 'tags-ignore'
  | 'paths'
  | 'paths-ignore';

export type WorkflowTriggersState = {
  hideTriggers: boolean;
  noneCustomization: Set<NoneCustomizationKeys>;
  typeCustomization: Map<
    TypesCustomizationKeys | CustomTypesCustomizationKeys,
    Set<string>
  >;
  complexCustomization: Map<
    ComplexTypesCustomizationKeys,
    Map<ComplexTypeCustomizationProps, Set<string>>
  >;
  cronCustomization: Map<CronCustomizationKeys, Cron[]>;
  triggers: Set<Trigger>;
};
type WorkflowTriggersActions = {
  toggleHideTriggers: Empty;
  toggleNoneTrigger: Single<NoneCustomizationKeys>;
  getTriggerTypes: Single<
    | TypesCustomizationKeys
    | CustomTypesCustomizationKeys
    | ComplexTypesCustomizationKeys,
    Set<string>
  >;
  getComplexTriggerBranches: Double<
    ComplexBranchesCustomizationKeys,
    boolean,
    Set<string>
  >;
  getComplexTriggerPaths: Double<
    ComplexPathsCustomizationKeys,
    boolean,
    Set<string>
  >;
  getComplexTriggerTags: Double<
    ComplexTagsCustomizationKeys,
    boolean,
    Set<string>
  >;
  toggleTypeTrigger: Single<
    TypesCustomizationKeys | CustomTypesCustomizationKeys
  >;
  toggleTypeTriggerProp: Double<
    | TypesCustomizationKeys
    | CustomTypesCustomizationKeys
    | ComplexTypesCustomizationKeys,
    string
  >;
  toggleComplexTrigger: Single<ComplexTypesCustomizationKeys>;
  toggleComplexTriggerBranch: Triple<
    ComplexBranchesCustomizationKeys,
    string,
    boolean
  >;
  toggleComplexTriggerPath: Triple<
    ComplexPathsCustomizationKeys,
    string,
    boolean
  >;
  toggleComplexTriggerTag: Triple<
    ComplexTagsCustomizationKeys,
    string,
    boolean
  >;
  toggleCronTrigger: Single<CronCustomizationKeys>;
  onAddCronTriggerValue: Single<CronCustomizationKeys>;
  onDeleteCronTriggerVaule: Double<CronCustomizationKeys, number>;
  onCronTriggerValueChange: Triple<
    CronCustomizationKeys,
    Partial<Cron>,
    number
  >;
};
export type WorkflowTriggersStore = WorkflowTriggersState &
  WorkflowTriggersActions;

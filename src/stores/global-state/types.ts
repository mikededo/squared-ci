import type { OriginPosition, Position } from '@/domain/shared';
import type {
  ComplexBranchesCustomizationKeys,
  ComplexPathCustomizationKeys,
  ComplexTagsCustomizationKeys,
  ComplexTypesCustomizationKeys,
  Cron,
  CronCustomizationKeys,
  CustomTypesCustomizationKeys,
  NoneCustomizationKeys,
  TypesCustomizationKeys,
} from '@/domain/trigger';
import type { Trigger } from '@/domain/trigger';

import type { FeatureSwitchesStore } from './feature-switches';

export type Empty<R = void> = () => R;
export type Single<T, R = void> = (arg0: T) => R;
export type Double<T, J, R = void> = (arg0: T, arg1: J) => R;

type GlobalDragState = Position & OriginPosition & { isDragging: boolean };
type GlobalDragActions = {
  onDragStart: Single<React.MouseEvent<HTMLElement, MouseEvent>>;
  onDragEnd: Empty;
  onDragChange: Single<React.MouseEvent<HTMLElement, MouseEvent>>;
};
export type GlobalDragStore = GlobalDragState & GlobalDragActions;

type WorkflowBasicsState = {
  name?: string;
  runName?: string;
};
type WorkflowBasicsActions = {
  onChangeName: Single<string>;
  onChangeRunName: Single<string>;
};
export type WorkflowBasicsStore = WorkflowBasicsState & WorkflowBasicsActions;

export type ComplexTypeCustomizationProps =
  | 'types'
  | 'branches'
  | 'tags'
  | 'paths';

export type WorkflowTriggersState = {
  noneCustomization: Set<NoneCustomizationKeys>;
  typeCustomization: Map<
    TypesCustomizationKeys | CustomTypesCustomizationKeys,
    Set<string>
  >;
  complexCustomization: Map<
    ComplexTypesCustomizationKeys,
    Map<ComplexTypeCustomizationProps, Set<string>>
  >;
  cronCustomization: Map<CronCustomizationKeys, Cron>;
  triggers: Set<Trigger>;
};
type WorkflowTriggersActions = {
  toggleNoneTrigger: Single<NoneCustomizationKeys>;
  getTriggerTypes: Single<
    | TypesCustomizationKeys
    | CustomTypesCustomizationKeys
    | ComplexTypesCustomizationKeys,
    Set<string>
  >;
  getComplexTriggerBranches: Single<
    ComplexBranchesCustomizationKeys,
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
  toggleComplexTriggerBranch: Double<ComplexBranchesCustomizationKeys, string>;
  toggleComplexTriggerPath: Double<ComplexPathCustomizationKeys, string>;
  toggleComplexTriggerTag: Double<ComplexTagsCustomizationKeys, string>;
  toggleCronTrigger: Single<CronCustomizationKeys>;
};
export type WorkflowTriggersStore = WorkflowTriggersState &
  WorkflowTriggersActions;

export type GlobalStore = FeatureSwitchesStore &
  GlobalDragStore &
  WorkflowBasicsStore &
  WorkflowTriggersStore;

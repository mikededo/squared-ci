import type { Field } from '@/editor/domain/matrix';
import type {
  PermissionStatus,
  Permissions,
} from '@/editor/domain/permissions';
import type { OriginPosition, Position } from '@/editor/domain/shared';
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

import type { FeatureSwitchesStore } from './feature-switches';
import type { OptionalSectionsStore } from './optional-sections';

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
  basics: {
    name: string;
    runName: string;
  };
};
type WorkflowBasicsActions = {
  onChangeBasicsName: Single<string>;
  onChangeBasicsRunName: Single<string>;
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
  getComplexTriggerPaths: Single<ComplexPathsCustomizationKeys, Set<string>>;
  getComplexTriggerTags: Single<ComplexTagsCustomizationKeys, Set<string>>;
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
  toggleComplexTriggerPath: Double<ComplexPathsCustomizationKeys, string>;
  toggleComplexTriggerTag: Double<ComplexTagsCustomizationKeys, string>;
  toggleCronTrigger: Single<CronCustomizationKeys>;
};
export type WorkflowTriggersStore = WorkflowTriggersState &
  WorkflowTriggersActions;

export type WorkflowPermissionsState = {
  totalPermissionsEnabled: number;
  permissions: {
    [K in Permissions]: Record<PermissionStatus, boolean>;
  };
  readAll: boolean;
  writeAll: boolean;
  disableAll: boolean;
};
export type WorkflowPermissionsActions = {
  togglePermission: Double<Permissions, PermissionStatus>;
  toggleReadAll: Empty;
  toggleWriteAll: Empty;
  toggleDisableAll: Empty;
};
export type WorkflowPermissionsStore = WorkflowPermissionsState &
  WorkflowPermissionsActions;

export type WorkflowEnvState = { variables: Set<string> };
export type WorkflowEnvActions = {
  /** Variable should be a valid KEY=VALUE environment variable. The parsing
   * of the variable should be done in the store. However, the expected format
   * should be validated in the component (basically to include the equal).
   */
  addVariable: Single<string>;
  deleteVariable: Single<string>;
};
export type WorkflowEnvStore = WorkflowEnvState & WorkflowEnvActions;

export type WorkflowConcurrencyState = {
  concurrency: {
    name: string;
    cancelInProgress: boolean;
    group: string;
    max: number;
    matrix: Field[];
  };
};
export type WorkflowConcurrencyActions = {
  toggleCancelInProgress: Empty;
  onChangeName: Single<string>; // TODO: Refactor name
  onChangeGroup: Single<string>;
  onChangeMax: Single<number>;
  onChangeMatrix: Single<Field[]>;
};
export type WorkflowConcurrencyStore = WorkflowConcurrencyState &
  WorkflowConcurrencyActions;

export type GlobalStore = FeatureSwitchesStore &
  OptionalSectionsStore &
  GlobalDragStore &
  WorkflowBasicsStore &
  WorkflowTriggersStore &
  WorkflowPermissionsStore &
  WorkflowEnvStore &
  WorkflowConcurrencyStore;

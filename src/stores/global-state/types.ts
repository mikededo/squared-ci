import type {
  Cron,
  CronCustomizationKeys,
  CustomTypesCustomizationKeys,
  NoneCustomizationKeys,
  TBDCustomizationKeys,
  TypesCustomizationKeys,
} from '@/domain/trigger';
import type { Trigger } from '@/domain/trigger';

type Single<T, R = void> = (arg0: T) => R;
type Double<T, J, R = void> = (arg0: T, arg1: J) => R;

type WorkflowBasicsState = {
  name?: string;
  runName?: string;
};
type WorkflowBasicsActions = {
  onChangeName: Single<string>;
  onChangeRunName: Single<string>;
};
export type WorkflowBasicsStore = WorkflowBasicsState & WorkflowBasicsActions;

type WorkflowTriggersState = {
  noneCustomization: Set<NoneCustomizationKeys>;
  typeCustomization: Map<
    TypesCustomizationKeys | CustomTypesCustomizationKeys,
    Set<string>
  >;
  tbdCustomization: Set<TBDCustomizationKeys>;
  cronCustomization: Map<CronCustomizationKeys, Cron>;
  triggers: Set<Trigger>;
};
type WorkflowTriggersActions = {
  toggleNoneTrigger: Single<NoneCustomizationKeys>;
  getTriggerTypes: Single<
    TypesCustomizationKeys | CustomTypesCustomizationKeys,
    Set<string>
  >;
  toggleTypeTrigger: Single<
    TypesCustomizationKeys | CustomTypesCustomizationKeys
  >;
  toggleTypeTriggerProp: Double<
    TypesCustomizationKeys | CustomTypesCustomizationKeys,
    string
  >;
  toggleTbdTrigger: Single<TBDCustomizationKeys>;
  toggleCronTrigger: Single<CronCustomizationKeys>;
};
export type WorkflowTriggersStore = WorkflowTriggersState &
  WorkflowTriggersActions;

export type GlobalStore = WorkflowBasicsStore & WorkflowTriggersStore;

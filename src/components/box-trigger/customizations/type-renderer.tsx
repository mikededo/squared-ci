import React, { memo } from 'react';

import type { Trigger } from '@/domain/trigger';
import { isTypeCustomization } from '@/domain/trigger';
import { isComplexCustomization } from '@/domain/trigger';
import { VCol } from '@/sd';
import { useWorkflowTriggersStore } from '@/stores';

import { Branches } from './branches';
import { None } from './none';
import { Types } from './types';

type Props = {
  trigger: Trigger | null;
};

export const TypeRenderer: React.FC<Props> = memo(({ trigger }) => {
  const { toggleTypeTriggerProp, getTriggerTypes } = useWorkflowTriggersStore();

  const handleOnTypesToggle =
    (trigger: Parameters<typeof toggleTypeTriggerProp>[0]) =>
    (type: string) => {
      toggleTypeTriggerProp(trigger, type);
    };

  return trigger ? (
    isComplexCustomization(trigger) ? (
      <VCol>
        <Types
          trigger={trigger}
          selected={[...getTriggerTypes(trigger)]}
          onTypeToggle={handleOnTypesToggle(trigger)}
        />
        <Branches trigger={trigger} />
      </VCol>
    ) : isTypeCustomization(trigger) ? (
      <Types
        trigger={trigger}
        selected={[...getTriggerTypes(trigger)]}
        onTypeToggle={handleOnTypesToggle(trigger)}
      />
    ) : (
      <None />
    )
  ) : null;
});
TypeRenderer.displayName = 'TypeRenderer';

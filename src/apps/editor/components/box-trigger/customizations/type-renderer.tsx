import React, { memo } from 'react';

import { DraggableWrapper, VCol } from '@/aero';
import type { Trigger } from '@/editor/domain/trigger';
import {
  isComplexCustomization,
  isComplexPathCustomization,
  isComplexTagCustomization,
  isTypeCustomization,
} from '@/editor/domain/trigger';
import { useWorkflowTriggersStore } from '@/editor/stores';

import { Branches } from './branches';
import { None } from './none';
import { Paths } from './paths';
import { Tags } from './tags';
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

  return (
    <DraggableWrapper>
      {trigger ? (
        isComplexCustomization(trigger) ? (
          <VCol variant="lg">
            <Types
              trigger={trigger}
              selected={[...getTriggerTypes(trigger)]}
              onTypeToggle={handleOnTypesToggle(trigger)}
            />
            <Branches trigger={trigger} />
            {isComplexPathCustomization(trigger) ? (
              <Paths trigger={trigger} />
            ) : null}
            {isComplexTagCustomization(trigger) ? (
              <Tags trigger={trigger} />
            ) : null}
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
      ) : null}
    </DraggableWrapper>
  );
});
TypeRenderer.displayName = 'TypeRenderer';

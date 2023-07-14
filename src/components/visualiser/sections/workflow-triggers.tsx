import React from 'react';

import { Comment, Keyword, Line } from '@/components';
import { useWorkflowTriggersStore } from '@/stores';

import {
  BaseCustomizationTrigger,
  TypeCustomizationTrigger,
} from './customization';

export const WorkflowTriggers: React.FC = () => {
  const {
    triggers,
    noneCustomization,
    tbdCustomization,
    typeCustomization,
    // TODO: cronCustomization,
  } = useWorkflowTriggersStore();

  return (
    <>
      {triggers.size === 0 ? (
        <Line>
          <Comment># Select at least one trigger for the workflow</Comment>
        </Line>
      ) : null}
      <Line>
        <Keyword>on</Keyword>:
      </Line>
      {[...typeCustomization].map(([customization, types]) => (
        <TypeCustomizationTrigger
          key={customization}
          text={customization}
          types={[...types]}
        />
      ))}
      {[...noneCustomization].map((customization) => (
        <BaseCustomizationTrigger key={customization} text={customization} />
      ))}
      {[...tbdCustomization].map((customization) => (
        <BaseCustomizationTrigger key={customization} text={customization} />
      ))}
    </>
  );
};

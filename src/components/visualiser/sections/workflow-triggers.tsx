import React from 'react';

import { VisualiserItems } from '@/sd';
import { useWorkflowTriggersStore } from '@/stores';

import {
  BaseCustomizationTrigger,
  TypeCustomizationTrigger,
} from './customization';

const { Comment, Keyword, Line } = VisualiserItems;

export const WorkflowTriggers: React.FC = () => {
  const {
    triggers,
    noneCustomization,
    // TODO: complexCustomization,
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
    </>
  );
};

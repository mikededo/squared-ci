import React from 'react';

import { Comment, Keyword, Line } from '@/aero';
import { useWorkflowTriggersStore } from '@/editor/stores';

import {
  BaseCustomizationTrigger,
  ComplexTypeCustomizationTrigger,
  CronCustomizationTrigger,
  TypeCustomizationTrigger,
} from './customization';

export const WorkflowTriggers: React.FC = () => {
  const {
    triggers,
    noneCustomization,
    complexCustomization,
    typeCustomization,
    cronCustomization,
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
      {[...complexCustomization].map(([customization, triggers]) => (
        <ComplexTypeCustomizationTrigger
          key={customization}
          text={customization}
          customizations={triggers}
        />
      ))}
      {[...typeCustomization].map(([customization, types]) => (
        <TypeCustomizationTrigger
          key={customization}
          text={customization}
          types={[...types]}
        />
      ))}
      {[...cronCustomization].map(([customization, cronList]) => (
        <CronCustomizationTrigger
          key={customization}
          text={customization}
          cronList={cronList}
        />
      ))}
      {[...noneCustomization].map((customization) => (
        <BaseCustomizationTrigger key={customization} text={customization} />
      ))}
    </>
  );
};

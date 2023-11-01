import React from 'react';

import {
  Chip,
  ChipWrapper,
  DraggableWrapper,
  Input,
  Label,
  VCol,
} from '@/aero';
import type { ComplexPathsCustomizationKeys } from '@/editor/domain/trigger';
import { useAdvancedInput } from '@/editor/hooks';
import { useWorkflowTriggersStore } from '@/editor/stores';

type Props = {
  trigger: ComplexPathsCustomizationKeys;
};

export const Paths: React.FC<Props> = ({ trigger }) => {
  const { toggleComplexTriggerPath, getComplexTriggerPaths } =
    useWorkflowTriggersStore();

  const paths = getComplexTriggerPaths(trigger, false);
  const ignoredPaths = getComplexTriggerPaths(trigger, true);

  const [pathsMethods] = useAdvancedInput('', {
    tabCount: [0, paths.size],
    onEnterPress: (value, { onResetInput }) => {
      toggleComplexTriggerPath(trigger, value, false);
      onResetInput();
    },
  });
  const [ignoredMethods] = useAdvancedInput('', {
    tabCount: [0, ignoredPaths.size],
    onEnterPress: (value, { onResetInput }) => {
      toggleComplexTriggerPath(trigger, value, true);
      onResetInput();
    },
  });

  const handleOnRemovePath = (path: string, ignore: boolean) => () => {
    toggleComplexTriggerPath(trigger, path, ignore);
  };

  return (
    <VCol variant="md">
      <DraggableWrapper>
        <Label className="w-[280px]">Paths</Label>
        {paths.size > 0 ? (
          <ChipWrapper variant="left">
            {[...paths].map((path) => (
              <Chip
                key={path}
                text={path}
                onClick={handleOnRemovePath(path, false)}
                active
              />
            ))}
          </ChipWrapper>
        ) : null}
        <Input placeholder="Type path name" {...pathsMethods} />
        <Label className="w-[280px]">Ignored paths</Label>
        {ignoredPaths.size > 0 ? (
          <ChipWrapper variant="left">
            {[...ignoredPaths].map((path) => (
              <Chip
                key={path}
                text={path}
                onClick={handleOnRemovePath(path, true)}
                active
              />
            ))}
          </ChipWrapper>
        ) : null}
        <Input placeholder="Type path to ignore" {...ignoredMethods} />
      </DraggableWrapper>
    </VCol>
  );
};

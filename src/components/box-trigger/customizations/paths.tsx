import React from 'react';

import type { ComplexPathCustomizationKeys } from '@/domain/trigger';
import { useAdvancedInput } from '@/hooks';
import { Chip, ChipWrapper, Input, VCol } from '@/sd';
import { useWorkflowTriggersStore } from '@/stores';

type Props = {
  trigger: ComplexPathCustomizationKeys;
};

export const Paths: React.FC<Props> = ({ trigger }) => {
  const { toggleComplexTriggerPath, getComplexTriggerPaths } =
    useWorkflowTriggersStore();

  const paths = getComplexTriggerPaths(trigger);

  const methods = useAdvancedInput('', {
    tabCount: [0, paths.size],
    onEnterPress: (value, { onResetInput }) => {
      toggleComplexTriggerPath(trigger, value);
      onResetInput();
    },
  });

  const handleOnRemovePath = (branch: string) => () => {
    toggleComplexTriggerPath(trigger, branch);
  };

  return (
    <VCol variant="md">
      {/* TODO: Extract into specific component in SD */}
      <p className="font-mono italic text-xs text-gray-400">Paths</p>
      {paths.size > 0 ? (
        <ChipWrapper variant="left">
          {[...paths].map((branch) => (
            <Chip
              key={branch}
              text={branch}
              onClick={handleOnRemovePath(branch)}
              active
            />
          ))}
        </ChipWrapper>
      ) : null}
      <Input placeholder="Type branch name" {...methods} />
    </VCol>
  );
};

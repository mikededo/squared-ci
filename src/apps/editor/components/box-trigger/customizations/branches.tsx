import React from 'react';

import {
  Chip,
  ChipWrapper,
  DraggableWrapper,
  Input,
  Label,
  VCol,
} from '@/aero';
import type { ComplexBranchesCustomizationKeys } from '@/editor/domain/trigger';
import { useAdvancedInput } from '@/editor/hooks';
import { useWorkflowTriggersStore } from '@/editor/stores';

type Props = {
  trigger: ComplexBranchesCustomizationKeys;
};

export const Branches: React.FC<Props> = ({ trigger }) => {
  const { toggleComplexTriggerBranch, getComplexTriggerBranches } =
    useWorkflowTriggersStore();

  const branches = getComplexTriggerBranches(trigger, false);
  const ignoredBranches = getComplexTriggerBranches(trigger, true);

  const branchesMethods = useAdvancedInput('', {
    tabCount: [0, branches.size],
    onEnterPress: (value, { onResetInput }) => {
      toggleComplexTriggerBranch(trigger, value, false);
      onResetInput();
    },
  });
  const ignoredMethods = useAdvancedInput('', {
    tabCount: [0, ignoredBranches.size],
    onEnterPress: (value, { onResetInput }) => {
      toggleComplexTriggerBranch(trigger, value, true);
      onResetInput();
    },
  });

  const handleOnRemoveBranch = (branch: string, ignore: boolean) => () => {
    toggleComplexTriggerBranch(trigger, branch, ignore);
  };

  return (
    <VCol variant="md">
      <DraggableWrapper>
        <Label className="w-[280px]">Branches</Label>
        {branches.size > 0 ? (
          <ChipWrapper variant="left">
            {[...branches].map((branch) => (
              <Chip
                key={branch}
                text={branch}
                onClick={handleOnRemoveBranch(branch, false)}
                active
              />
            ))}
          </ChipWrapper>
        ) : null}
        <Input placeholder="Type branch name" {...branchesMethods} />
        <Label className="w-[280px]">Ignored branches</Label>
        {ignoredBranches.size > 0 ? (
          <ChipWrapper variant="left">
            {[...ignoredBranches].map((branch) => (
              <Chip
                key={branch}
                text={branch}
                onClick={handleOnRemoveBranch(branch, true)}
                active
              />
            ))}
          </ChipWrapper>
        ) : null}
        <Input placeholder="Type branch to ignore" {...ignoredMethods} />
      </DraggableWrapper>
    </VCol>
  );
};

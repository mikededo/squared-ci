import { atom, useAtom } from 'jotai';
import React, { useMemo } from 'react';

import type { ComplexBranchesCustomizationKeys } from '@/domain/trigger';
import { Chip, ChipWrapper, Input, VCol } from '@/sd';
import { useWorkflowTriggersStore } from '@/stores';

type Props = {
  trigger: ComplexBranchesCustomizationKeys;
};

export const Branches: React.FC<Props> = ({ trigger }) => {
  const [inputValue, setInputValue] = useAtom(useMemo(() => atom(''), []));
  const { toggleComplexTriggerBranch, getComplexTriggerBranches } =
    useWorkflowTriggersStore();

  const handleOnInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };

  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') {
      return;
    }

    e.preventDefault();
    toggleComplexTriggerBranch(trigger, inputValue);
    setInputValue('');
  };

  const handleOnRemoveBranch = (branch: string) => () => {
    toggleComplexTriggerBranch(trigger, branch);
  };

  const branches = getComplexTriggerBranches(trigger);

  return (
    <VCol variant="md">
      {/* TODO: Extract into specific component in SD */}
      <p className="font-mono italic text-xs text-gray-400">Branches</p>
      {branches.size > 0 ? (
        <ChipWrapper variant="left">
          {[...branches].map((branch) => (
            <Chip
              key={branch}
              text={branch}
              onClick={handleOnRemoveBranch(branch)}
              active
            />
          ))}
        </ChipWrapper>
      ) : null}
      <Input
        value={inputValue}
        placeholder="Type branch name"
        onKeyDown={onKeyPress}
        onChange={handleOnInputChange}
      />
    </VCol>
  );
};

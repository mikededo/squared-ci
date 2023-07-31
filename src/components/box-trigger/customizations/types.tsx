import React, { useMemo } from 'react';

import type { Trigger } from '@/domain/trigger';
import { isComplexCustomization } from '@/domain/trigger';
import { TriggerTypes } from '@/domain/trigger';
import { Chip, ChipWrapper, VCol } from '@/sd';

type Props = {
  trigger: Trigger;
  selected: string[];
  onTypeToggle: (type: string) => void;
};

export const Types: React.FC<Props> = ({ trigger, selected, onTypeToggle }) => {
  const withTitle = useMemo(() => isComplexCustomization(trigger), [trigger]);

  const handleOnTypeToggle = (type: string) => () => {
    onTypeToggle(type);
  };

  const types = TriggerTypes[trigger];
  if (types === undefined) {
    return null;
  }

  return (
    <VCol>
      {withTitle ? (
        <p className="font-mono italic text-xs text-gray-400">Types</p>
      ) : null}
      <ChipWrapper variant="left">
        {types.map((type) => (
          <Chip
            key={type}
            text={type}
            active={selected.includes(type)}
            onClick={handleOnTypeToggle(type)}
          />
        ))}
      </ChipWrapper>
    </VCol>
  );
};

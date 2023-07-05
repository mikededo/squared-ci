import React from 'react';

import { Chip } from '@/components';
import type { Trigger} from '@/domain/trigger';
import { TriggerTypes } from '@/domain/trigger';

import { ChipWrapper } from './chip-wrapper';

type Props = {
  trigger: Trigger;
  selected: string[];
  onTypeToggle: (type: string) => void;
};

export const Types: React.FC<Props> = ({ trigger, selected, onTypeToggle }) => {
  const handleOnTypeToggle = (type: string) => () => {
    onTypeToggle(type);
  };

  const types = TriggerTypes[trigger];
  if (types === undefined) {
    return null;
  }

  return (
    <ChipWrapper>
      {types.map((type) => (
        <Chip
          key={type}
          text={type}
          active={selected.includes(type)}
          onClick={handleOnTypeToggle(type)}
        />
      ))}
    </ChipWrapper>
  );
};

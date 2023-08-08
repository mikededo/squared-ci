import React from 'react';

import type { Trigger } from '@/domain/trigger';
import { IconButton } from '@/sd';

type TriggerItem = {
  key: Trigger;
  icon: React.ReactNode;
};

type IconGroupProps = {
  triggers: TriggerItem[];
  selected: Set<Trigger>;
  onIconClick: (trigger: Trigger) => void;
};

export const TriggerGroup: React.FC<IconGroupProps> = ({
  triggers,
  selected,
  onIconClick,
}) => {
  const handleOnClick = (trigger: Trigger) => () => {
    onIconClick(trigger);
  };

  return (
    <div className="grid grid-cols-4 grid-flow-row-dense gap-1 justify-between">
      {triggers.map(({ key, icon }) => (
        <IconButton
          key={key}
          selected={selected.has(key)}
          onClick={handleOnClick(key)}
          tooltip={key}
        >
          {icon}
        </IconButton>
      ))}
    </div>
  );
};

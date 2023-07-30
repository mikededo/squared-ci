import React from 'react';

import type { FeatureSwitches } from '@/domain/feature-switches';
import { Toggle } from '@/sd';
import { useFeatureSwitch } from '@/stores';

type Props = {
  feature: FeatureSwitches;
  title: string;
  description?: string;
  disabled?: boolean;
};

export const Feature: React.FC<Props> = ({
  feature,
  title,
  description,
  disabled,
}) => {
  const { [feature]: isActive, toggleFS } = useFeatureSwitch(feature);

  return (
    <li>
      <Toggle
        text={title}
        value={isActive as boolean}
        disabled={disabled}
        onClick={toggleFS}
      />
      {description ? (
        <p className="font-light text-sm text-gray-400 dark:text-slate-200 max-w-[320px]">
          {description}
        </p>
      ) : null}
    </li>
  );
};

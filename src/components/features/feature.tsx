import React from 'react';

import { Toggle } from '@/sd';
import type { FeatureSwitches } from '@/stores';
import { useFeatureSwitch } from '@/stores';

type Props = {
  feature: keyof FeatureSwitches;
  description?: string;
};

export const Feature: React.FC<Props> = ({ feature, description }) => {
  const { [feature]: isActive, toggleFS } = useFeatureSwitch(feature);

  const handleOnClick = () => {
    toggleFS(feature);
  };

  return (
    <li>
      <Toggle
        text="Global drag"
        value={isActive as boolean}
        onClick={handleOnClick}
      />
      {description ? (
        <p className="font-light text-sm text-gray-400 dark:text-slate-200 max-w-[320px]">
          {description}
        </p>
      ) : null}
    </li>
  );
};

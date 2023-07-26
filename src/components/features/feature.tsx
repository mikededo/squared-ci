import React from 'react';

import { Toggle } from '@/sd';
import type { FeatureSwitches } from '@/stores';
import { useFeatureSwitch } from '@/stores';

type Props = {
  feature: keyof FeatureSwitches;
  title: string;
  description?: string;
};

export const Feature: React.FC<Props> = ({ feature, title, description }) => {
  const { [feature]: isActive, toggleFS } = useFeatureSwitch(feature);

  return (
    <li>
      <Toggle text={title} value={isActive as boolean} onClick={toggleFS} />
      {description ? (
        <p className="font-light text-sm text-gray-400 dark:text-slate-200 max-w-[320px]">
          {description}
        </p>
      ) : null}
    </li>
  );
};

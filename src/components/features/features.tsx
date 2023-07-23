import React from 'react';

import { Divider, Toggle } from '@/components';
import type { FeatureSwitches } from '@/stores';
import { useFeatureSwitch } from '@/stores';

import { Page } from './page';

type Props = {
  feature: keyof FeatureSwitches;
  description?: string;
};

const Feature: React.FC<Props> = ({ feature, description }) => {
  const { [feature]: isActive, toggleFS } = useFeatureSwitch(feature);

  const handleOnClick = () => {
    toggleFS(feature);
  };

  return (
    <li>
      <Toggle text="Global drag" value={isActive} onClick={handleOnClick} />
      {description ? (
        <p className="font-light text-sm text-gray-400">{description}</p>
      ) : null}
    </li>
  );
};

export const Features: React.FC = () => (
  <Page>
    <p className="font-semibold">Experiments</p>
    <p className="font-light text-sm text-gray-400">
      You can activate these experiments in order to test beta or unfinished
      features.
    </p>
    <p className="font-light text-sm text-gray-400 italic">
      Use them at your own risk!
    </p>
    <Divider className="mt-2 mb-3" />
    <ul className="flex flex-col gap-1 ">
      <Feature
        feature="fsGlobalDrag"
        description="Background dragging, moving all items"
      />
    </ul>
  </Page>
);

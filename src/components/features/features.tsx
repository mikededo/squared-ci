import React from 'react';

import { Divider } from '@/sd';

import { Feature } from './feature';
import { Page } from './page';

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

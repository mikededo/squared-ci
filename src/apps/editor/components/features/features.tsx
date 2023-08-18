import React from 'react';

import { Divider } from '@/aero';

import { Container } from './container';
import { Feature } from './feature';

const FeatureList: Parameters<typeof Feature>[0][] = [
  {
    feature: 'fsGlobalDrag',
    title: 'Global drag',
    description: 'Background dragging, moving all items',
  },
  {
    feature: 'fsDarkTheme',
    title: 'Dark theme',
    description: 'Enables the dark theme mode, by enabling the toggler.',
  },
  {
    feature: 'fsMatrix',
    title: 'Matrix editor',
    description:
      'Enables the configuration of a matrix. Currently it is only available through the concurrency box, which can be enabled in the optional sections.',
  },
  {
    feature: 'fsCopyAction',
    title: 'Copy action',
    description:
      'Copies the generated action code to the clipboard. Currently only shows the button.',
  },
];

export const Features: React.FC = () => (
  <Container>
    <p className="font-semibold">Experiments</p>
    <p className="font-light text-sm text-muted-foreground">
      You can activate these experiments in order to test beta or unfinished
      features.
    </p>
    <p className="font-light text-sm text-muted-foreground">
      Use them at your own risk!
    </p>
    <Divider className="mt-2 mb-3" />
    <ul className="flex flex-col gap-1 ">
      {FeatureList.map((props) => (
        <Feature key={props.feature} {...props} />
      ))}
    </ul>
  </Container>
);

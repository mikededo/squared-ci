import React from 'react';

import { Keyword, Tabbed } from '@/aero';
import type { YamlField } from '@/aero';

import { YamlRenderer } from './yaml-renderer';

type Props = {
  title?: string;
  yaml: YamlField[];
  /**
   * Use to add tabs to the initial rendering of the matrix.
   */
  tabs?: number;
};

export const YamlVisualiser: React.FC<Props> = ({ title, yaml, tabs = 0 }) => (
  <>
    {title ? (
      <Tabbed tabs={tabs}>
        <Keyword>{title}</Keyword>:
      </Tabbed>
    ) : null}
    {yaml.map((field) => (
      <YamlRenderer key={field.id} field={field} depth={tabs} />
    ))}
  </>
);

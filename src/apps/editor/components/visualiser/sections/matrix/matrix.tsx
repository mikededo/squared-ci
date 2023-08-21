import React from 'react';

import { Keyword, Tabbed } from '@/aero';
import type { Field } from '@/editor/domain/matrix';

import { MatrixRenderer } from './matrix-renderer';

type Props = {
  matrix: Field[];
  /**
   * Use to add tabs to the initial rendering of the matrix.
   */
  tabs?: number;
};

export const Matrix: React.FC<Props> = ({ matrix, tabs = 0 }) => (
  <>
    <Tabbed tabs={tabs}>
      <Keyword>matrix</Keyword>:
    </Tabbed>
    {matrix.map((field) => (
      <MatrixRenderer key={field.id} field={field} depth={tabs} />
    ))}
  </>
);

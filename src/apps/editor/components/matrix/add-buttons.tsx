import { PlusIcon } from '@primer/octicons-react';
import React from 'react';

import { Button, Row } from '@/aero';

import type { UseFieldsResult } from './use-fields';

type Props = {
  nested?: boolean;
  path: string[];
  onAddField: UseFieldsResult['onAddField'];
};

export const AddButtons: React.FC<Props> = ({ nested, path, onAddField }) => (
  <Row className={nested ? undefined : 'self-end'}>
    <Button variant="secondary" onClick={onAddField('string', path)} condensed>
      {nested ? <PlusIcon className="mr-1" /> : 'Add '}
      <span>string</span>
    </Button>
    <Button variant="secondary" onClick={onAddField('object', path)} condensed>
      {nested ? <PlusIcon className="mr-1" /> : 'Add '}
      <span>object</span>
    </Button>
    <Button variant="secondary" onClick={onAddField('array', path)} condensed>
      {nested ? <PlusIcon className="mr-1" /> : 'Add '}
      <span>array</span>
    </Button>
  </Row>
);

import React from 'react';

import { Button, Row } from '@/aero';
import { useSearchParam } from '@/chain';

import type { Views } from './types';

const NEXT_VIEW: Record<Views, Views> = {
  b: 'p',
  p: 'coc',
  coc: 'o',
  o: 'e',
  e: 'd',
  d: 'ste',
  ste: 'str',
  str: 'con',
  con: 'ser',
  ser: 'h',
  h: 'h',
};
const PREV_VIEW: Record<Views, Views> = {
  h: 'ser',
  ser: 'con',
  con: 'str',
  str: 'ste',
  ste: 'd',
  d: 'e',
  e: 'o',
  o: 'coc',
  coc: 'p',
  p: 'b',
  b: 'b',
};

export const DialogNavigation: React.FC = () => {
  const { getParam, setParam } = useSearchParam();
  const currentParam = (getParam('view') ?? 'b') as Views;
  const isFirst = currentParam === 'b';
  const isLast = currentParam === 'h';

  const handleOnNext = () => {
    setParam('view', NEXT_VIEW[currentParam]);
  };

  const handleOnPrev = () => {
    setParam('view', PREV_VIEW[currentParam]);
  };

  return (
    <Row className="pr-6 py-4 w-full" justify="between">
      <Row className="gap-2">
        <Button onClick={handleOnPrev} variant="secondary" disabled={isFirst}>
          Previous
        </Button>
        <Button onClick={handleOnNext} variant="secondary" disabled={isLast}>
          Next
        </Button>
      </Row>
      <Row className="gap-2">
        <Button onClick={() => console.log('discard')} variant="text">
          Cancel
        </Button>
        <Button onClick={() => console.log('discard')}>Save</Button>
      </Row>
    </Row>
  );
};

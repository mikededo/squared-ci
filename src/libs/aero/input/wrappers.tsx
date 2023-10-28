import React from 'react';

import type { RequiredChildrenFC } from '@/pulse';

import type { Props } from './types';
import { VCol } from '../col';
import { Row } from '../row';

export const IconWrapper: RequiredChildrenFC<Pick<Props, 'icon'>> = ({
  icon,
  children,
}) =>
  icon ? (
    <Row variant="none" align="center" expand>
      {children}
    </Row>
  ) : (
    children
  );

export const ErrorTextWrapper: RequiredChildrenFC<Pick<Props, 'error'>> = ({
  error,
  children,
}) =>
  error ? (
    <VCol expand>
      {children}
      <p className="text-sm text-destructive">{error}</p>
    </VCol>
  ) : (
    children
  );

import React from 'react';

import type { RequiredChildrenFC } from '@/pulse';

import type { Props } from './types';
import { Button } from '../button';
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

export const ButtonWrapper: RequiredChildrenFC<
  Pick<Props, 'button' | 'buttonDisabled' | 'onButtonClick'>
> = ({ children, button, buttonDisabled, onButtonClick }) =>
  button ? (
    <Row variant="lg" align="center" expand>
      {children}
      <Button
        variant="primary"
        className="h-9 rounded-md"
        onClick={onButtonClick}
        disabled={buttonDisabled}
        condensed
      >
        {button}
      </Button>
    </Row>
  ) : (
    children
  );

import React from 'react';
import { twMerge } from 'tailwind-merge';

import { Input } from './input';
import type { Props as BaseProps } from './input';
import { Row } from '../row';

type Props = BaseProps & {
  icon: React.ReactNode;
  onIconClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export const IconInput: React.FC<Props> = ({
  icon,
  onIconClick,
  multiline,
  ...props
}) => (
  <Row className="w-full gap-0" align="center">
    <Input {...props} multiline={multiline} />
    <button
      className={twMerge(
        'flex items-center justify-center hover:bg-primary/10 transition-colors -ml-8 h-5 w-5 rounded-full cursor-pointer',
        multiline && 'self-start mt-2',
      )}
      onClick={onIconClick}
    >
      {icon}
    </button>
  </Row>
);

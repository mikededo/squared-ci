import React from 'react';

import { Input } from './input';
import type { Props as BaseProps } from './input';
import { Row } from '../row';

type Props = BaseProps & {
  icon: React.ReactNode;
  onIconClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export const IconInput: React.FC<Props> = ({ icon, onIconClick, ...props }) => (
  <Row className="w-full gap-0" align="center">
    <Input {...props} />
    <button
      className="flex items-center justify-center hover:bg-primary/10 transition-colors -ml-8 h-5 w-5 rounded-full cursor-pointer"
      onClick={onIconClick}
    >
      {icon}
    </button>
  </Row>
);

import classNames from 'classnames';
import React from 'react';

type Props = { className?: string };

export const Divider: React.FC<Props> = ({ className }) => (
  <hr
    className={classNames(
      'w-100 mb-1 border-dashed border-slate-200',
      className
    )}
  />
);

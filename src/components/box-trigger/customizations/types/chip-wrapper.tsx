import React, { PropsWithChildren } from 'react';

export const ChipWrapper: React.FC<Required<PropsWithChildren>> = ({
  children,
}) => (
  <div className="flex flex-wrap gap-1 m-auto w-[280px] justify-center">
    {children}
  </div>
);

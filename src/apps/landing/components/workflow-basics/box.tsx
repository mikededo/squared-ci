import React from 'react';

import { DraggableTitle, Input } from '@/aero';
import { BorderedBox } from '@/landing/components';

type Props = {
  onJobNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRunNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onJobNameFocus: () => void;
  onRunNameFocus: () => void;
  onJobNameBlur: () => void;
  onRunNameBlur: () => void;
};

export const Box: React.FC<Props> = ({
  onJobNameBlur,
  onJobNameChange,
  onJobNameFocus,
  onRunNameBlur,
  onRunNameChange,
  onRunNameFocus,
}) => (
  <BorderedBox columns={12} sm={6} md={4} lg={3} right bottom>
    <div className="p-6 flex justify-center bg-paper bg-paper-size bg-center">
      <div className="rounded-lg bg-card w-full transition-colors border hover:border-extra">
        <DraggableTitle title="Workflow basics" />
        <div className="px-3 pb-3 pt-1.5 flex flex-col gap-2">
          <Input
            placeholder="Job name"
            onChange={onJobNameChange}
            onBlur={onJobNameBlur}
            onFocus={onJobNameFocus}
          />
          <Input
            placeholder="Run name"
            onChange={onRunNameChange}
            onBlur={onRunNameBlur}
            onFocus={onRunNameFocus}
          />
        </div>
      </div>
    </div>
  </BorderedBox>
);

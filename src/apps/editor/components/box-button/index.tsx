import { ChevronRightIcon } from '@primer/octicons-react';
import React from 'react';

import { DraggableWrapper, Meta, Row } from '@/aero';

type Props = {
  title: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

export const BoxButton: React.FC<Props> = ({ title, onClick }) => (
  <button
    className="py-1.5 px-2 -mt-0.5 rounded-md border border-input hover:bg-muted transition-colors cursor-pointer text-muted-foreground w-full"
    onClick={onClick}
  >
    <Row align="center" justify="between">
      <DraggableWrapper>
        <Meta className="text-muted-foreground">{title}</Meta>
        <ChevronRightIcon className="fill-muted-foreground" />
      </DraggableWrapper>
    </Row>
  </button>
);

import { XIcon } from '@primer/octicons-react';
import React from 'react';

import { Row } from '../row';

type Props = {
  title: string;
  onClose?: () => void;
};

export const DialogHeader: React.FC<Props> = ({ title, onClose }) => (
  <Row align="center" justify="between" className="p-5 pb-0 w-full">
    <h2 className="text-2xl font-semibold">{title}</h2>
    {onClose ? (
      <button
        className="outline-none rounded-full hover:bg-muted transition-colors h-8 w-8"
        onClick={onClose}
      >
        <XIcon size={24} />
      </button>
    ) : null}
  </Row>
);

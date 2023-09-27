import { ArrowDownIcon } from '@primer/octicons-react';
import React from 'react';

import { Row } from '@/aero';

import { BorderedBox } from '../bordered-box';

type Props = { title: string };

export const ItemHeader: React.FC<Props> = ({ title }) => (
  <BorderedBox className="group" columns={12} bottom>
    <Row
      className="py-2 px-4 md:px-0 md:py-4"
      variant="lg"
      justify="center"
      align="center"
    >
      <ArrowDownIcon className="group-hover:animate-bounce" />
      <h3 className="font-semibold text-lg text-center relative before:absolute before:left-2 before:-right-2 before:bottom-0.5 before:h-2 before:bg-extra/30">
        {title}
      </h3>
      <ArrowDownIcon className="group-hover:animate-bounce" />
    </Row>
  </BorderedBox>
);

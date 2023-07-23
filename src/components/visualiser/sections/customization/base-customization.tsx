import React from 'react';

import type { NoneCustomizationKeys } from '@/domain/trigger';
import { VisualiserItems } from '@/sd';

const { Keyword, Tabbed } = VisualiserItems;

type Props = { text: NoneCustomizationKeys };

export const BaseCustomizationTrigger: React.FC<Props> = ({ text }) => (
  <Tabbed tabs={2}>
    <Keyword>{text}</Keyword>
  </Tabbed>
);

import React from 'react';

import { VisualiserItems } from '@/aero';
import type { NoneCustomizationKeys } from '@/editor/domain/trigger';

const { Keyword, Tabbed } = VisualiserItems;

type Props = { text: NoneCustomizationKeys };

export const BaseCustomizationTrigger: React.FC<Props> = ({ text }) => (
  <Tabbed tabs={2}>
    <Keyword>{text}</Keyword>
  </Tabbed>
);

import React from 'react';

import { Keyword, Tabbed } from '@/aero';
import type { NoneCustomizationKeys } from '@/editor/domain/trigger';

type Props = { text: NoneCustomizationKeys };

export const BaseCustomizationTrigger: React.FC<Props> = ({ text }) => (
  <Tabbed tabs={2}>
    <Keyword>{text}</Keyword>
  </Tabbed>
);

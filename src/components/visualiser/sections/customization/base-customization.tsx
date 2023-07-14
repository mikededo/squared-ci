import React from 'react';

import { Keyword, Tabbed } from '@/components';
import type {
  NoneCustomizationKeys,
  TBDCustomizationKeys,
} from '@/domain/trigger';


type Props = {
  text: NoneCustomizationKeys | TBDCustomizationKeys;
};

export const BaseCustomizationTrigger: React.FC<Props> = ({ text }) => (
  <Tabbed tabs={2}>
    <Keyword>{text}</Keyword>
  </Tabbed>
);

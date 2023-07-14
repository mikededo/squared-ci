import React from 'react';

import type {
  NoneCustomizationKeys,
  TBDCustomizationKeys,
} from '@/domain/trigger';

import { Keyword, Tabbed } from '../../shared';

type Props = {
  text: NoneCustomizationKeys | TBDCustomizationKeys;
};

export const BaseCustomizationTrigger: React.FC<Props> = ({ text }) => (
  <Tabbed tabs={2}>
    <Keyword>{text}</Keyword>
  </Tabbed>
);

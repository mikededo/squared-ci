import React from 'react';

import type {
  CustomTypesCustomizationKeys,
  TypesCustomizationKeys,
} from '@/domain/trigger';

import { Keyword, List, Tabbed } from '../../shared';

type TypeCustomizationTriggerProps = {
  text: TypesCustomizationKeys | CustomTypesCustomizationKeys;
  types: string[];
};

export const TypeCustomizationTrigger: React.FC<
  TypeCustomizationTriggerProps
> = ({ text, types }) => (
  <>
    <Tabbed tabs={2}>
      <Keyword>{text}</Keyword>
      {types.length > 0 ? ':' : null}
    </Tabbed>
    {types.length > 0 ? (
      <List
        tabFactor={2}
        group="types"
        items={types}
        asBulletList={types.length > 4}
      />
    ) : null}
  </>
);

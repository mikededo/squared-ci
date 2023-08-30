import React from 'react';

import { Keyword, List, Tabbed } from '@/aero';
import type { ComplexTypesCustomizationKeys } from '@/editor/domain/trigger';

type ComplexTypeCustomizationTriggerProps = {
  text: ComplexTypesCustomizationKeys;
  customizations: Map<string, Set<string>>;
};

type Props = {
  items: Set<string>;
  group: string;
};

const CustomizationList: React.FC<Props> = ({ items, group }) =>
  items.size > 0 ? (
    <List
      tabFactor={2}
      group={group}
      items={[...items]}
      asBulletList={items.size > 4}
    />
  ) : null;

export const ComplexTypeCustomizationTrigger: React.FC<
  ComplexTypeCustomizationTriggerProps
> = ({ text, customizations }) => {
  const types = customizations.get('types') ?? new Set<string>();
  const branches = customizations.get('branches') ?? new Set<string>();
  const ignoredBranches =
    customizations.get('branches-ignore') ?? new Set<string>();
  const paths = customizations.get('paths') ?? new Set<string>();
  const ignoredPaths = customizations.get('paths-ignore') ?? new Set<string>();
  const tags = customizations.get('tags') ?? new Set<string>();
  const ignoredTags = customizations.get('tags-ignore') ?? new Set<string>();

  const hasAnyCustomization =
    types.size > 0 ||
    branches.size > 0 ||
    ignoredBranches.size > 0 ||
    paths.size > 0 ||
    ignoredPaths.size > 0 ||
    tags.size > 0 ||
    ignoredTags.size > 0;

  return (
    <>
      <Tabbed tabs={2}>
        <Keyword>{text}</Keyword>
        {hasAnyCustomization ? ':' : null}
      </Tabbed>
      <CustomizationList items={types} group="types" />
      <CustomizationList items={branches} group="branches" />
      <CustomizationList items={ignoredBranches} group="branches-ignore" />
      <CustomizationList items={paths} group="paths" />
      <CustomizationList items={ignoredPaths} group="paths-ignore" />
      <CustomizationList items={tags} group="tags" />
      <CustomizationList items={ignoredTags} group="tags-ignore" />
    </>
  );
};

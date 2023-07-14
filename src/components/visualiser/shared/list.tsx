import React from 'react';

import { Keyword, Tabbed } from './base';

type ListProps = {
  tabFactor: number;
  group: string;
  items: string[];
  asBulletList?: boolean;
};

const InLineList: React.FC<Pick<ListProps, 'items'>> = ({ items }) => (
  <>
    [
    {items.map((item, index, { length }) => (
      <React.Fragment key={item}>
        {item}
        {index === length - 1 ? '' : ', '}
      </React.Fragment>
    ))}
    ]
  </>
);

const BulletList: React.FC<Pick<ListProps, 'items' | 'tabFactor'>> = ({
  items,
  tabFactor,
}) => (
  <>
    {items.map((item) => (
      <Tabbed key={item} tabs={tabFactor * 2 + 2}>
        - {item}
      </Tabbed>
    ))}
  </>
);

export const List: React.FC<ListProps> = ({
  group,
  items,
  tabFactor = 2,
  asBulletList = false,
}) => (
  <>
    <Tabbed tabs={tabFactor * 2}>
      <Keyword>{group}</Keyword>:{' '}
      {!asBulletList ? <InLineList items={items} /> : null}
    </Tabbed>
    {asBulletList ? <BulletList tabFactor={tabFactor} items={items} /> : null}
  </>
);

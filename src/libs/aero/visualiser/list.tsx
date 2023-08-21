import React from 'react';

import { Keyword, Tabbed } from './keywords';

type ListProps = {
  tabFactor: number;
  group?: string;
  items: string[] | React.ReactElement[];
  asBulletList?: boolean;
};

const InLineList: React.FC<Pick<ListProps, 'items'>> = ({ items }) => (
  <>
    [
    {items.map((item, index, { length }) =>
      typeof item === 'string' ? (
        <React.Fragment key={item}>
          {item}
          {index === length - 1 ? '' : ', '}
        </React.Fragment>
      ) : (
        <>{item}</>
      ),
    )}
    ]
  </>
);

const BulletList: React.FC<Pick<ListProps, 'items' | 'tabFactor'>> = ({
  items,
  tabFactor,
}) => (
  <>
    {items.map((item) =>
      typeof item === 'string' ? (
        <Tabbed key={item} tabs={tabFactor * 2 + 2}>
          <span className="text-[#333] dark:text-slate-300">-</span> {item}
        </Tabbed>
      ) : (
        <>{item}</>
      ),
    )}
  </>
);

export const List: React.FC<ListProps> = ({
  group,
  items,
  tabFactor = 2,
  asBulletList = false,
}) => (
  <>
    {group ? (
      <Tabbed tabs={tabFactor * 2}>
        <Keyword>{group}: </Keyword>{' '}
        {!asBulletList ? <InLineList items={items} /> : null}
      </Tabbed>
    ) : null}
    {!group && !asBulletList ? <InLineList items={items} /> : null}
    {asBulletList ? <BulletList tabFactor={tabFactor} items={items} /> : null}
  </>
);

import React from 'react';

import { Keyword, Tabbed } from '@/aero';
import type { Cron } from '@/editor/domain/trigger';

type Props = {
  text: string;
  cronList: Cron[];
};

export const CronCustomizationTrigger: React.FC<Props> = ({
  text,
  cronList,
}) => (
  <>
    <Tabbed tabs={2}>
      <Keyword>{text}</Keyword>:
    </Tabbed>
    {cronList.map((cron, index) => (
      <Tabbed tabs={4} key={index}>
        - <Keyword>cron</Keyword>: &apos;
        {cron.map((value, index, { length }) =>
          index !== length - 1 ? `${value} ` : value,
        )}
        &apos;
      </Tabbed>
    ))}
  </>
);

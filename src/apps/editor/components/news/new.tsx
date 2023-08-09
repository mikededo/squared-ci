import React from 'react';

import {
  formatDateToRelative,
  isDateLessThanOneWeekAgo,
} from '@/editor/util/date';

export type NewItem = {
  title: string;
  description: string;
  date?: Date;
};

export const New: React.FC<NewItem> = ({ title, description, date }) => (
  <div className="flex flex-col">
    <div className="flex justify-between items-center">
      <h3 className="font-semibold flex-1 max-w-[80%] line-clamp-1 overflow-hidden text-ellipsis">
        {title}
      </h3>
      {date ? (
        <div className="flex flex-shrink-0 items-center gap-2">
          {isDateLessThanOneWeekAgo(date) ? (
            <div className="h-2 w-2 bg-red-500 rounded-full animate-pulse" />
          ) : null}
          <p className="text-xs font-light">{formatDateToRelative(date)}</p>
        </div>
      ) : null}
    </div>
    <p className="text-sm max-w-[85%]">{description}</p>
  </div>
);

import { atom, useAtom } from 'jotai';
import React, { useMemo } from 'react';

import { Button } from '@/sd';

import { Dialog } from './dialog';
import type { NewItem } from './new';
import { New } from './new';

const NewsList: NewItem[] = [
  {
    title: 'Added FS counter & local storage persistence',
    description:
      'A new feature switch counter and local storage persistence have been added.',
    date: new Date('2023-07-26'),
  },
  {
    title: 'Added dark theme toggler',
    description:
      'A new dark theme toggler feature has been added to the application.',
    date: new Date('2023-07-26'),
  },
  {
    title: 'Fixed issues with the feature switch hook',
    description: 'Issues with the feature switch hook have been fixed.',
    date: new Date('2023-07-25'),
  },
  {
    title: 'Added dark theme',
    description:
      'A new dark theme feature has been implemented in the application.',
    date: new Date('2023-07-25'),
  },
  {
    title: 'Added a feature switch controller',
    description:
      'A feature switch controller has been added to the application.',
    date: new Date('2023-07-22'),
  },
  {
    title: 'Added global drag (non-functional implementation)',
    description:
      'An initial implementation of global drag has been added to the application.',
    date: new Date('2023-07-19'),
  },
  {
    title: 'Deprecate TBD customization type',
    description:
      'The TBD customization type has been deprecated in favor of a new approach.',
    date: new Date('2023-07-12'),
  },
];

export const News: React.FC = () => {
  const [opened, setOpened] = useAtom(useMemo(() => atom(true), []));

  const onToggleStatus = () => {
    setOpened((prev) => !prev);
  };
  return !opened ? null : (
    <Dialog>
      <div className="flex flex-col justify-between h-full w-full">
        <h2 className="text-2xl font-semibold mb-6 p-5 pb-0">News</h2>
        <div className="self-start flex-1 flex flex-col gap-4 px-5 mb-5 w-full">
          {NewsList.map(({ title, description, date }) => (
            <New
              key={title}
              title={title}
              description={description}
              date={date}
            />
          ))}
        </div>
        <div className="flex justify-end p-5 pt-0 gap-2">
          <Button onClick={onToggleStatus} variant="text">
            Don&apos;t show again
          </Button>
          <Button onClick={onToggleStatus}>Understood</Button>
        </div>
      </div>
    </Dialog>
  );
};

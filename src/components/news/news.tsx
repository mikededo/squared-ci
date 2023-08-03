import React from 'react';

import { Button, VCol } from '@/sd';

import { Dialog } from './dialog';
import type { NewItem } from './new';
import { New } from './new';
import { useNews } from './use-news';

const NewsList: NewItem[] = [
  {
    title: 'Added workflow permissions',
    description:
      'Added the possibility of adding permissions to the workflow. Enable it in the FS panel.',
    date: new Date('2023-08-02'),
  },
  {
    title: 'Fixed issues with connectors',
    description:
      'Due to improper updates, the connector of boxes was not properly being updated. There are still some features to be fixed.',
    date: new Date('2023-08-01'),
  },
  {
    title: 'Added path and tags customization',
    description:
      'Alongside the branches customization, it is possible to configure paths and tags as triggers for specific events.',
    date: new Date('2023-07-31'),
  },
  {
    title: 'Added branches customization',
    description:
      'Added the possibility of adding branches to the triggers that can be triggered by filtering the events that happen in specific branches. This events are pull_request, pull_request_target and push',
    date: new Date('2023-07-29'),
  },
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
];

export const News: React.FC = () => {
  const { opened, onToggleStatus, onHideNews } = useNews();

  return !opened ? null : (
    <Dialog>
      <VCol variant="xl" className=" h-full w-full">
        <h2 className="text-2xl font-semibold p-5 pb-0">News</h2>
        <div className="self-start gap-4 p-2 rounded-lg text-center mx-5 bg-slate-200 dark:bg-slate-700 text-sm">
          <strong className="font-semibold inline-block">
            Coming soon:&nbsp;
          </strong>
          <span>
            coping the generated code to the clipboard, improved drag
            experience, fixed global drag and more! Thanks for coming!
          </span>
        </div>
        <div className="self-start flex-1 flex flex-col gap-4 px-5 w-full overflow-y-auto">
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
          <Button onClick={onHideNews} variant="text">
            Don&apos;t show again
          </Button>
          <Button onClick={onToggleStatus}>Understood</Button>
        </div>
      </VCol>
    </Dialog>
  );
};

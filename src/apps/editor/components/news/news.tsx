import React from 'react';

import { Banner, Button, Dialog, DialogHeader, Row, VCol } from '@/aero';

import type { NewItem } from './new';
import { New } from './new';
import { useNews } from './use-news';

const NewsList: NewItem[] = [
  {
    title: 'Matrix editor (beta)',
    description:
      "A first version of the matrix editor has been added. It is still in beta, so it may have some bugs. If you find one, please report it in the issues section (there's no such section, yet!).",
    date: new Date('2023-08-18'),
  },
  {
    title: 'Added support for concurrency',
    description:
      'Now you can add concurrency to your workflow. The feature has to be enabled through a feature switch.',
    date: new Date('2023-08-13'),
  },
  {
    title: 'Added support for environment variables',
    description:
      'Now you can add environment variables to your workflow, which can be enabled through the optional sections menu',
    date: new Date('2023-08-11'),
  },
  {
    title: 'Performance improvements on drag',
    description:
      'The drag feature has been improved. Smooth, fast and able to drag without stuttering',
    date: new Date('2023-08-08'),
  },
  {
    title: 'Tooltips are here! 🎉',
    description:
      'By popular demand, now you can hover over the icons to see what mean.',
    date: new Date('2023-08-08'),
  },
  {
    title: 'Added optional sections',
    description:
      'The permissions FS has been moved to a feature now! The other optional sections (env, defaults and concurrency) will be able soon. Now, a new menu option has been added that displays a pop up to toggle/untoggle the optional sections.',
    date: new Date('2023-08-06'),
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

  return (
    <Dialog show={opened} blur>
      <VCol variant="xl" className="h-full w-full">
        <DialogHeader title="News" />
        <Banner main="Coming soon:" className="mx-5">
          <span>
            {' '}
            coping the generated code to the clipboard, improved drag
            experience, fixed global drag and more! Thanks for coming!
          </span>
        </Banner>
        <div className="self-start flex-1 flex flex-col gap-4 w-full overflow-y-auto px-5">
          {NewsList.map(({ title, description, date }) => (
            <New
              key={title}
              title={title}
              description={description}
              date={date}
            />
          ))}
        </div>
        <Row className="p-5 pt-0 gap-2 self-end">
          <Button onClick={onHideNews} variant="text">
            Don&apos;t show again
          </Button>
          <Button onClick={onToggleStatus}>Understood</Button>
        </Row>
      </VCol>
    </Dialog>
  );
};

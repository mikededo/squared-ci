import React from 'react';

import { Banner, Button, Dialog, DialogHeader, Row, VCol } from '@/aero';

import type { NewItem } from './new';
import { New } from './new';
import { useNews } from './use-news';

const NewsList: NewItem[] = [
  {
    title: 'Hide workflow triggers',
    description:
      'New menu option that allows you to hide the workflow triggers in order to have a cleaner layout if you have many active',
    date: new Date('2023-10-10'),
  },
  {
    title: 'Schedule cron trigger',
    description:
      'For the schedule trigger, it is now possible to customize the crons for the schedule',
    date: new Date('2023-09-02'),
  },
  {
    title: 'Edit action file name',
    description: 'New you can edit the file name in the visualiser',
    date: new Date('2023-08-31'),
  },
  {
    title: 'Ignore paths, branches and tags',
    description:
      'Added a missing feature to ignore branches, tags and/or paths for the workflow triggers that allow it.',
    date: new Date('2023-08-30'),
  },
  {
    title: 'Box documentation',
    description:
      'Added references to the GitHub documentation for the different elements of the builder.',
    date: new Date('2023-08-26'),
  },
  {
    title: 'Matrix improvements',
    description:
      'Fixed some of the issues with the matrix and added the possibility to collapse the matrix!',
    date: new Date('2023-08-25'),
  },
  {
    title: 'Matrix visualisation',
    description:
      'The changes applied to the concurrency matrix property can now be visualised in the preview.',
    date: new Date('2023-08-21'),
  },
  {
    title: 'Matrix editor undo/redo',
    description: 'Now you can undo/redo your changes in the matrix editor.',
    date: new Date('2023-08-18'),
  },
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
        <Banner className="mx-5">
          <span>
            The project is currently on stand by, as I am a bit short on time
            and have other priorities!
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

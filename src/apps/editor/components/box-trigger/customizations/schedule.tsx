import { TrashIcon } from '@primer/octicons-react';
import React from 'react';

import { Button, IconButton, Input, Label, Link, Row, VCol } from '@/aero';
import type { Cron, CronCustomizationKeys } from '@/editor/domain/trigger';
import { useWorkflowCronTriggerStore } from '@/editor/stores';

import { None } from './none';

type Props = {
  trigger?: CronCustomizationKeys;
};

// Currently, schedule is the only one that exists
export const Schedule: React.FC<Props> = ({ trigger = 'schedule' }) => {
  const {
    cronCustomization,
    onCronTriggerValueChange,
    onAddCronTriggerValue,
    onDeleteCronTriggerVaule,
  } = useWorkflowCronTriggerStore();

  const cronList = cronCustomization.get(trigger);
  if (!cronList) {
    return <None />;
  }

  const handleOnAddCron = () => {
    onAddCronTriggerValue(trigger);
  };

  const handleOnDeleteCron = (position: number) => () => {
    onDeleteCronTriggerVaule(trigger, position);
  };

  const handleOnChange =
    (cronPosition: number, valuePosition: number) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.currentTarget;
      const cron: Partial<Cron> = [
        valuePosition === 0 ? value : undefined,
        valuePosition === 1 ? value : undefined,
        valuePosition === 2 ? value : undefined,
        valuePosition === 3 ? value : undefined,
        valuePosition === 4 ? value : undefined,
      ];

      onCronTriggerValueChange(trigger, cron, cronPosition);
    };

  return (
    <VCol className="max-w-[280px]" variant="md">
      <Label>
        Configure the schedule using cron format. You can find more information
        here: <Link href="https://en.wikipedia.org/wiki/Cron">Cron</Link>. Leave
        an input empty to fill it with{' '}
        <span className="font-extrabold font-mono">*</span>.
      </Label>
      <VCol>
        {cronList.map((cron, cronPosition) => (
          <Row key={cronPosition} variant="md" align="center">
            {cron.map((value, position) => (
              <Input
                key={position}
                variant="plain"
                placeholder="*"
                value={value}
                onChange={handleOnChange(cronPosition, position)}
              />
            ))}
            {cronPosition === 0 ? (
              <span className="min-w-[32px]" />
            ) : (
              <IconButton
                className="min-w-[32px] h-8 p-0"
                variant="plain"
                onClick={handleOnDeleteCron(cronPosition)}
              >
                <TrashIcon />
              </IconButton>
            )}
          </Row>
        ))}
      </VCol>
      <Button
        className="self-end"
        variant="text"
        onClick={handleOnAddCron}
        condensed
      >
        Add cron
      </Button>
    </VCol>
  );
};

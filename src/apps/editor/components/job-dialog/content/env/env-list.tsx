import React from 'react';

import { Chip, ChipWrapper, Label } from '@/aero';
import { useSelectedJobId } from '@/editor/hooks';
import { useJobEnv } from '@/editor/stores';

export const EnvList: React.FC = () => {
  const jobId = useSelectedJobId();
  const { env, onDeleteEnv } = useJobEnv(jobId ?? '');

  const hasEntries = env && env.size > 0;
  if (!hasEntries) {
    return (
      <Label className="mx-auto">
        The list of variables that you have created will be displayed here.
      </Label>
    );
  }

  const handleOnDeleteKey = (key: string) => () => {
    onDeleteEnv(key);
  };

  return (
    <ChipWrapper variant="left" expand>
      {[...env.entries()].map(([key, value]) => (
        <Chip
          key={key}
          text={`${key}=${value}`}
          onClick={handleOnDeleteKey(key)}
          active
        />
      ))}
    </ChipWrapper>
  );
};

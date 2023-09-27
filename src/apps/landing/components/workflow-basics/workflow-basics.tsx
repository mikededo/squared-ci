import { useAtom } from 'jotai';
import React, { useMemo } from 'react';

import { previewInputAtom } from '@/landing/atoms';

import { Box } from './box';
import { Visualiser } from './visualiser';

export const WorkflowBasics: React.FC = () => {
  const [jobName, setJobName] = useAtom(useMemo(() => previewInputAtom(), []));
  const [runName, setRunName] = useAtom(useMemo(() => previewInputAtom(), []));

  const handleOnChange =
    (setAtom: typeof setJobName | typeof setRunName) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setAtom({ value: e.target.value });
    };

  const handleOnTouch =
    (setAtom: typeof setJobName | typeof setRunName, focused: boolean) =>
    () => {
      setAtom({ focused });
    };

  return (
    <>
      <Box
        onJobNameChange={handleOnChange(setJobName)}
        onJobNameBlur={handleOnTouch(setJobName, false)}
        onJobNameFocus={handleOnTouch(setJobName, true)}
        onRunNameChange={handleOnChange(setRunName)}
        onRunNameBlur={handleOnTouch(setRunName, false)}
        onRunNameFocus={handleOnTouch(setRunName, true)}
      />
      <Visualiser
        jobName={jobName.value}
        jobNameFocused={jobName.focused}
        runName={runName.value}
        runNameFocused={runName.focused}
      />
    </>
  );
};

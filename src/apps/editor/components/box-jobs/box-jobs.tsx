import React, { useRef } from 'react';

import {
  Draggable,
  DraggableTitle,
  DraggableWrapper,
  Input,
  Label,
  VCol,
} from '@/aero';
import { useSearchParam } from '@/chain';
import { ActionsDocs, Positions } from '@/editor/config';
import { useAdvancedInput } from '@/editor/hooks';
import { useWorkflowJobs } from '@/editor/stores';

import { BoxButton } from '../box-button';

const BoxJobsContent: React.FC = () => {
  const { setParam } = useSearchParam();
  const { jobs, onAddJob } = useWorkflowJobs();
  const [methods, { onResetInput }] = useAdvancedInput('', {
    spaceAsUnderscore: true,
    preventUppercase: true,
    onEnterPress: (value, { onResetInput }) => {
      onAddJob(value);
      onResetInput();
    },
  });

  const handleOnClick = (jobId: string) => () => {
    setParam({ 'job-editor': jobId, view: 'b' });
  };

  const handleOnAdd = () => {
    onAddJob(methods.value);
    onResetInput();
  };

  return (
    <DraggableWrapper>
      <VCol className="px-3 pb-3 max-w-[280px]" variant="xl">
        <VCol variant="md" expand>
          <Label>Create a job by typing its id. Press enter to submit.</Label>
          <Input
            {...methods}
            placeholder="job_id"
            button="Add"
            onButtonClick={handleOnAdd}
            buttonDisabled={!methods.value}
          />
        </VCol>
        <VCol variant="md" expand>
          <p className="text-xs uppercase">Created jobs</p>
          {jobs.length ? (
            jobs.map((job) => (
              <BoxButton key={job} title={job} onClick={handleOnClick(job)} />
            ))
          ) : (
            <Label>
              You still have not created any job. Created job ids will appear
              here to be edited.
            </Label>
          )}
        </VCol>
      </VCol>
    </DraggableWrapper>
  );
};

export const BoxJobs: React.FC = () => {
  const innerRef = useRef(null);

  return (
    <DraggableWrapper>
      <Draggable
        innerRef={innerRef}
        initialX={Positions.BoxConcurrencyX}
        initialY={Positions.BoxConcurrencyY}
        visible={({ ref, onExpand }) => (
          <DraggableWrapper>
            <div ref={ref}>
              <DraggableTitle
                title="Workflow jobs"
                docsHref={ActionsDocs.workflowConcurrency}
                onExpand={onExpand}
              />
              <BoxJobsContent />
            </div>
          </DraggableWrapper>
        )}
      />
    </DraggableWrapper>
  );
};

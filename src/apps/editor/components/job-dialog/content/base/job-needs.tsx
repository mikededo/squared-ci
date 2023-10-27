import React from 'react';

import { Chip, ChipWrapper, Label, VCol } from '@/aero';
import { JobDocs } from '@/editor/config';
import { useSelectedJobId } from '@/editor/hooks';
import { useWorkflowNeeds } from '@/editor/stores';

import { Section, SectionHeader } from '../shared';

export const JobNeeds: React.FC = () => {
  const jobId = useSelectedJobId();
  const { active, inactive, onToggleJobNeed } = useWorkflowNeeds(jobId ?? '');
  console.log(active, inactive);

  const handleOnClick = (jobId: string) => () => {
    onToggleJobNeed(jobId);
  };

  return (
    <Section>
      <SectionHeader
        title="Needs"
        docs={JobDocs.jobNeeds}
        subtitle="Set up the job or list of jobs that must complete successfully before running this job"
      />
      <VCol expand>
        {active.size > 0 ? (
          <ChipWrapper variant="left" className="mx-0">
            {[...active].map((job) => (
              <Chip key={job} text={job} onClick={handleOnClick(job)} active />
            ))}
          </ChipWrapper>
        ) : null}
        <p className="text-sm font-medium">Workflow jobs</p>
        {active.size === 0 && inactive.size === 0 ? (
          <Label>
            You have not created any other job. Create other jobs and they will
            appear here.
          </Label>
        ) : inactive.size === 0 ? (
          <Label>You have marked all jobs as requirements.</Label>
        ) : (
          <ChipWrapper variant="left" className="mx-0">
            {[...inactive].map((job) => (
              <Chip key={job} text={job} onClick={handleOnClick(job)} />
            ))}
          </ChipWrapper>
        )}
      </VCol>
    </Section>
  );
};

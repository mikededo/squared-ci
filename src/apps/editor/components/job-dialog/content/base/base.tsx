import React from 'react';

import { VCol } from '@/aero';

import { JobContinueOnError } from './job-continue-on-error';
import { JobEnvironment } from './job-environment';
import { JobName } from './job-name';
import { JobNeeds } from './job-needs';

export const BaseContent: React.FC = () => (
  <VCol className="gap-6" expand>
    <JobName />
    <JobNeeds />
    <JobEnvironment />
    {/* TODO: Add recommendations of if conditions */}
    {/* <InputSection */}
    {/*   title="Job conditions (if)" */}
    {/*   docs={JobDocs.jobIf} */}
    {/*   subtitle="Prevent a job from running unless this condition is met" */}
    {/* /> */}
    {/* <InputSection */}
    {/*   title="Timeout minutes" */}
    {/*   docs={JobDocs.jobTimeoutMinutes} */}
    {/*   subtitle="The maximum number of minutes to let a job run before it is automatically cancelled" */}
    {/* /> */}
    <JobContinueOnError />
  </VCol>
);

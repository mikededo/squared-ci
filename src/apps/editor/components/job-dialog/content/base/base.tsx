import React from 'react';

import { VCol } from '@/aero';

import { JobConcurrency } from './job-concurrency';
import { JobContinueOnError } from './job-continue-on-error';
import { JobEnvironment } from './job-environment';
import { JobIf } from './job-if';
import { JobName } from './job-name';
import { JobNeeds } from './job-needs';
import { JobRunsOn } from './job-runs-on';
import { JobTimeoutMinutes } from './job-timeout-minutes';
import { JobUses } from './job-uses';
import { JobWith } from './job-with';

export const BaseContent: React.FC = () => (
  <VCol className="gap-6" expand>
    <JobName />
    <JobNeeds />
    <JobIf />
    <JobRunsOn />
    <JobConcurrency />
    <JobEnvironment />
    <JobUses />
    <JobWith />
    <JobTimeoutMinutes />
    <JobContinueOnError />
  </VCol>
);

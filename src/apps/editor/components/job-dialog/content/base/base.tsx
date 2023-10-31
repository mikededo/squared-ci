import React from 'react';

import { VCol } from '@/aero';

import { JobContinueOnError } from './job-continue-on-error';
import { JobEnvironment } from './job-environment';
import { JobIf } from './job-if';
import { JobName } from './job-name';
import { JobNeeds } from './job-needs';
import { JobTimeoutMinutes } from './job-timeout-minutes';

export const BaseContent: React.FC = () => (
  <VCol className="gap-6" expand>
    <JobName />
    <JobNeeds />
    <JobEnvironment />
    <JobIf />
    <JobTimeoutMinutes />
    <JobContinueOnError />
  </VCol>
);

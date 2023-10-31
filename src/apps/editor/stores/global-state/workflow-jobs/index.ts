import type { StateCreator } from 'zustand';

import { jobBase } from './job-base';
import { jobCondition } from './job-condition';
import { jobContinueOnError } from './job-continue-error';
import { jobEnvironment } from './job-environment';
import { jobNeeds } from './job-needs';
import { jobTimeoutMinutes } from './job-timeout-minutes';
import type { GlobalStore, Job, WorkflowJobsStore } from '../types';

const BaseJob: Omit<Job, 'id'> = {
  name: '',
  needs: new Set(),
  environment: { name: '' },
  continueOnError: false,
  condition: '',
  timeoutMinutes: 360,
};

export const workflowJobsStore: StateCreator<
  GlobalStore,
  [],
  [],
  WorkflowJobsStore
> = (set, get, ...rest) => ({
  jobs: new Map(),
  onAddJob: (id) => {
    const jobs = new Map([...get().jobs]);
    jobs.set(id, { id: id, ...BaseJob });
    set({ jobs });
  },
  ...jobBase(set, get, ...rest),
  ...jobNeeds(set, get, ...rest),
  ...jobEnvironment(set, get, ...rest),
  ...jobContinueOnError(set, get, ...rest),
  ...jobCondition(set, get, ...rest),
  ...jobTimeoutMinutes(set, get, ...rest),
});

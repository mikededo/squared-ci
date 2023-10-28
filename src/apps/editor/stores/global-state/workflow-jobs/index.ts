import type { StateCreator } from 'zustand';

import { workflowBase } from './workflow-base';
import { workflowContinueOnError } from './workflow-continue-error';
import { workflowEnvironment } from './workflow-environment';
import { workflowNeeds } from './workflow-needs';
import type { GlobalStore, Job, WorkflowJobsStore } from '../types';

const BaseJob: Omit<Job, 'id'> = {
  name: '',
  needs: new Set(),
  environment: { name: '' },
  continueOnError: false,
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
  ...workflowBase(set, get, ...rest),
  ...workflowNeeds(set, get, ...rest),
  ...workflowEnvironment(set, get, ...rest),
  ...workflowContinueOnError(set, get, ...rest),
});

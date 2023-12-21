import type { StateCreator } from 'zustand';

import { jobBase } from './job-base';
import { jobConcurrency } from './job-concurrency';
import { jobCondition } from './job-condition';
import { jobContainer } from './job-container';
import { jobContinueOnError } from './job-continue-error';
import { jobEnv } from './job-env';
import { jobEnvironment } from './job-environment';
import { jobNeeds } from './job-needs';
import { jobPermissions } from './job-permissions';
import { jobRunsOn } from './job-runs-on';
import { jobTimeoutMinutes } from './job-timeout-minutes';
import { jobUses } from './job-uses';
import { jobWith } from './job-with';
import { INITIAL_PERMISSIONS_STATE } from '../helpers';
import type { GlobalStore, Job, WorkflowJobsStore } from '../types';

const BaseJob: Omit<Job, 'id'> = {
  name: '',
  needs: new Set(),
  environment: { name: '' },
  continueOnError: false,
  condition: '',
  concurrency: { group: '', cancelInProgress: false },
  timeoutMinutes: 360,
  uses: '',
  runsOn: {
    custom: new Set(),
    group: { group: '', label: '' },
  },
  with: new Map(),
  permissions: INITIAL_PERMISSIONS_STATE,
  env: new Map(),
  container: {
    image: '',
    credentials: { name: '', password: '' },
    env: new Set(),
    ports: new Set(),
    volumes: new Set(),
    options: new Set(),
  },
};

const initialMap = new Map();
initialMap.set('initial', { ...BaseJob, name: 'initial' });

export const workflowJobsStore: StateCreator<
  GlobalStore,
  [],
  [],
  WorkflowJobsStore
> = (set, get, ...rest) => ({
  jobs: initialMap,
  onAddJob: (id) => {
    const jobs = new Map([...get().jobs]);
    jobs.set(id, { id: id, ...BaseJob });
    set({ jobs });
  },
  ...jobBase(set, get, ...rest),
  ...jobConcurrency(set, get, ...rest),
  ...jobCondition(set, get, ...rest),
  ...jobContainer(set, get, ...rest),
  ...jobContinueOnError(set, get, ...rest),
  ...jobEnv(set, get, ...rest),
  ...jobEnvironment(set, get, ...rest),
  ...jobNeeds(set, get, ...rest),
  ...jobPermissions(set, get, ...rest),
  ...jobRunsOn(set, get, ...rest),
  ...jobTimeoutMinutes(set, get, ...rest),
  ...jobUses(set, get, ...rest),
  ...jobWith(set, get, ...rest),
});

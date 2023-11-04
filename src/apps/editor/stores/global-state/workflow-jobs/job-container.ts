import type { StateCreator } from 'zustand';

import type { Container } from '@/editor/domain/container';

import { addEnvVariable } from '../helpers';
import type { GlobalStore, WorkflowJobsContainerActions } from '../types';

const addToSet = (
  jobs: GlobalStore['jobs'],
  jobId: string,
  key: 'ports' | 'env' | 'volumes' | 'options',
  value: string,
) => {
  if (!jobs.has(jobId)) {
    return;
  }

  const updated = new Map(jobs);
  const current = updated.get(jobId)!;
  if (current.container[key].has(value)) {
    return;
  }

  current.container[key].add(value);
  return updated;
};

const deleteFromSet = (
  jobs: GlobalStore['jobs'],
  jobId: string,
  key: 'ports' | 'env' | 'volumes' | 'options',
  value: string,
) => {
  if (!jobs.has(jobId)) {
    return;
  }

  const updated = new Map(jobs);
  const current = updated.get(jobId)!;
  if (!current.container[key].has(value)) {
    return;
  }

  current.container[key].delete(value);
  return updated;
};

const updateCredential = (
  jobs: GlobalStore['jobs'],
  jobId: string,
  cred: keyof Container['credentials'],
  value: string,
) => {
  const updated = new Map(jobs);
  const current = updated.get(jobId)!;
  current.container.credentials[cred] = value;
  return updated;
};

export const jobContainer: StateCreator<
  GlobalStore,
  [],
  [],
  WorkflowJobsContainerActions
> = (set, get) => ({
  onChangeJobContainerImage: (jobId) => (image) => {
    const { jobs } = get();
    if (!jobs.has(jobId)) {
      return;
    }

    const updated = new Map(jobs);
    const current = updated.get(jobId)!;
    current.container.image = image;
    set({ jobs: updated });
  },
  onChangeJobContainerCredentialsName: (jobId) => (name) => {
    const { jobs } = get();
    if (!jobs.has(jobId)) {
      return;
    }

    set({ jobs: updateCredential(jobs, jobId, 'name', name) });
  },
  onChangeJobContainerCredentialsPassword: (jobId) => (password) => {
    const { jobs } = get();
    if (!jobs.has(jobId)) {
      return;
    }

    set({
      jobs: updateCredential(jobs, jobId, 'password', password),
    });
  },
  onAddJobContainerEnv: (jobId) => (variable) => {
    const { jobs } = get();
    if (!jobs.has(jobId)) {
      return;
    }

    const updated = new Map(jobs);
    const current = updated.get(jobId)!;
    current.container.env = new Set([
      ...get().variables,
      addEnvVariable(variable),
    ]);
    set({ jobs: updated });
  },
  onDeleteJobContainerEnv: (jobId) => (variable) => {
    const { jobs } = get();
    const maybeUpdated = deleteFromSet(jobs, jobId, 'env', variable);
    if (!maybeUpdated) {
      return;
    }

    set({ jobs: maybeUpdated });
  },
  onAddJobContainerPorts: (jobId) => (port) => {
    const { jobs } = get();
    const maybeUpdated = addToSet(jobs, jobId, 'ports', port);
    if (!maybeUpdated) {
      return;
    }

    set({ jobs: maybeUpdated });
  },
  onDeleteJobContainerPorts: (jobId) => (port) => {
    const { jobs } = get();
    const maybeUpdated = deleteFromSet(jobs, jobId, 'ports', port);
    if (!maybeUpdated) {
      return;
    }

    set({ jobs: maybeUpdated });
  },
  onAddJobContainerVolumes: (jobId) => (volume) => {
    const { jobs } = get();
    const maybeUpdated = addToSet(jobs, jobId, 'volumes', volume);
    if (!maybeUpdated) {
      return;
    }

    set({ jobs: maybeUpdated });
  },
  onDeleteJobContainerVolumes: (jobId) => (volume) => {
    const { jobs } = get();
    const maybeUpdated = deleteFromSet(jobs, jobId, 'volumes', volume);
    if (!maybeUpdated) {
      return;
    }

    set({ jobs: maybeUpdated });
  },
  onAddJobContainerOptions: (jobId) => (option) => {
    const { jobs } = get();
    const maybeUpdated = addToSet(jobs, jobId, 'options', option);
    if (!maybeUpdated) {
      return;
    }

    set({ jobs: maybeUpdated });
  },
  onDeleteJobContainerOptions: (jobId) => (option) => {
    const { jobs } = get();
    const maybeUpdated = deleteFromSet(jobs, jobId, 'options', option);
    if (!maybeUpdated) {
      return;
    }

    set({ jobs: maybeUpdated });
  },
});

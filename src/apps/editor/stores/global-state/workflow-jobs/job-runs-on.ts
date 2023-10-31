import type { StateCreator } from 'zustand';

import type { GlobalStore, WorkflowJobsRunsOnActions } from '../types';

export const jobRunsOn: StateCreator<
  GlobalStore,
  [],
  [],
  WorkflowJobsRunsOnActions
> = (set, get) => ({
  onChangeJobGithubRunner: (jobId) => (runner) => {
    const { jobs } = get();
    if (!jobs.has(jobId)) {
      return;
    }

    const updated = new Map(jobs);
    const current = updated.get(jobId)!;
    current.runsOn.githubRunner = runner;
    set({ jobs: updated });
  },
  onToggleJobRunCustomValue: (jobId) => (value) => {
    const { jobs } = get();
    if (!jobs.has(jobId)) {
      return;
    }

    const updated = new Map(jobs);
    const current = updated.get(jobId)!.runsOn;
    if (current.custom.has(value)) {
      current.custom.delete(value);
    } else {
      current.custom.add(value);
    }
    set({ jobs: updated });
  },
  onChangeJobRunGroup: (jobId) => (group) => {
    const { jobs } = get();
    if (!jobs.has(jobId)) {
      return;
    }

    const updated = new Map(jobs);
    const current = updated.get(jobId)!.runsOn;
    current.group.group = group;
    set({ jobs: updated });
  },
  onChangeJobRunLabel: (jobId) => (label) => {
    const { jobs } = get();
    if (!jobs.has(jobId)) {
      return;
    }

    const updated = new Map(jobs);
    const current = updated.get(jobId)!.runsOn;
    current.group.label = label;
    set({ jobs: updated });
  },
  // Clear events
  onClearJobGithubRunner: (jobId) => () => {
    const { jobs } = get();
    if (!jobs.has(jobId)) {
      return;
    }

    const updated = new Map(jobs);
    const current = updated.get(jobId)!;
    current.runsOn.githubRunner = undefined;
    set({ jobs: updated });
  },
  onClearJobRunCustomValue: (jobId) => () => {
    const { jobs } = get();
    if (!jobs.has(jobId)) {
      return;
    }

    const updated = new Map(jobs);
    const current = updated.get(jobId)!.runsOn;
    current.custom = new Set();
    set({ jobs: updated });
  },
  onClearJobRunGroup: (jobId) => () => {
    const { jobs } = get();
    if (!jobs.has(jobId)) {
      return;
    }

    const updated = new Map(jobs);
    const current = updated.get(jobId)!.runsOn;
    current.group.group = '';
    current.group.label = '';
    set({ jobs: updated });
  },
});

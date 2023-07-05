import { create } from 'zustand';

import type { WorkflowBasicsStore } from './types';
import { workflowBasicsStore } from './workflow-basics';

type GlobalStore = WorkflowBasicsStore;

const globalStore = create<GlobalStore>()((...args) => ({
  ...workflowBasicsStore(...args),
}));

export const useWorkflowBasicsStore = () =>
  globalStore(({ name, runName, onChangeName, onChangeRunName }) => ({
    name,
    runName,
    onChangeName,
    onChangeRunName,
  }));

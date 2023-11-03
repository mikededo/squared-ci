import { useSearchParam } from '@/chain';

import type { Views } from '../components/job-dialog/types';

export const useJobView = (view: Views) => {
  const { getParam } = useSearchParam();
  return getParam('view') === view;
};

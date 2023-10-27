import { useSearchParam } from '@/chain';

export const useSelectedJobId = () => {
  const { getParam } = useSearchParam();
  return getParam('job-editor');
};

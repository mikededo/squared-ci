import { useQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';

import type { DockerResponse } from '@/editor/domain/docker';
import { useJobView } from '@/editor/hooks';

const fetchDockerHub = async (searchTerm: string): Promise<DockerResponse> => {
  const response = await fetch(`/api/docker?page_size=25&q=${searchTerm}`, {
    headers: { 'Search-Version': 'v3' },
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
};

export const useDockerHub = (term: string) => {
  const [debouncedTerm] = useDebounce(term, 350);
  const isContainerViewActive = useJobView('con');

  const { data, isLoading, isPending, error } = useQuery({
    queryKey: ['docker-images', debouncedTerm],
    queryFn: () => fetchDockerHub(debouncedTerm),
    enabled: !!debouncedTerm && isContainerViewActive,
  });

  return { data, isLoading: (isLoading || isPending) && term !== '', error };
};

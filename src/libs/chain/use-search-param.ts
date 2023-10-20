'use client';

import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

type GetSearchParameter = (name: string) => string | null;
type SetSearchParameter = (name: string, value: string) => void;
type DeleteSearchParameter = (name: string) => void;

type UseSearchParameterFn = () => {
  getParam: GetSearchParameter;
  setParam: SetSearchParameter;
  deleteParam: DeleteSearchParameter;
};

export const useSearchParam: UseSearchParameterFn = () => {
  const params = useSearchParams();
  const { pathname, replace } = useRouter();

  const getParam: GetSearchParameter = useCallback(
    (name) => params.get(name),
    [params],
  );

  const setParam: SetSearchParameter = useCallback(
    (name, value) => {
      const searchParams = new URLSearchParams(params);
      searchParams.set(name, value);
      replace(`${pathname}?${searchParams.toString()}`);
    },
    [pathname, params, replace],
  );

  const deleteParam: DeleteSearchParameter = useCallback(
    (name) => {
      const searchParams = new URLSearchParams(params);
      searchParams.delete(name);
      const searchParamsString =
        searchParams.toString().length > 0 ? `?${searchParams.toString()}` : '';

      replace(`${pathname}${searchParamsString}`);
    },
    [pathname, params, replace],
  );

  return { setParam, deleteParam, getParam };
};

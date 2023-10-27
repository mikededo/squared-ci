'use client';

import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

type GetSearchParameter = (name: string) => string | null;
type SetSearchParameter = (entries: Record<string, string>) => void;
type DeleteSearchParameter = (name: string | string[]) => void;

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
    (entries) => {
      const searchParams = new URLSearchParams(params);

      Object.entries(entries).forEach(([param, value]) => {
        if (value === '') {
          searchParams.delete(param);
        } else {
          searchParams.set(param, value);
        }
      });

      replace(`${pathname}?${searchParams.toString()}`);
    },
    [pathname, params, replace],
  );

  const deleteParam: DeleteSearchParameter = useCallback(
    (paramNames) => {
      const searchParams = new URLSearchParams(params);

      if (typeof paramNames === 'string') {
        searchParams.delete(paramNames);
      } else {
        paramNames.forEach((param) => {
          searchParams.delete(param);
        });
      }

      const searchParamsString =
        searchParams.toString().length > 0 ? `?${searchParams.toString()}` : '';
      replace(`${pathname}${searchParamsString}`);
    },
    [pathname, params, replace],
  );

  return { setParam, deleteParam, getParam };
};

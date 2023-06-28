import React from 'react';

import { useViewport } from '@/hooks';

type Path = { key: string; path: string };
type Props = { paths?: Path[] };

export const BoxConnectors: React.FC<Props> = ({ paths }) => {
  const { width, height } = useViewport();

  return paths && paths.length > 0 ? (
    <svg
      className="fill-none fixed pointer-events-none"
      width={width}
      height={height}
    >
      {paths.map(({ key, path }) => (
        <path
          key={key}
          className="z-index-10 stroke-[4px] transition-[stroke] stroke-indigo-500"
          d={path}
        />
      ))}
    </svg>
  ) : null;
};

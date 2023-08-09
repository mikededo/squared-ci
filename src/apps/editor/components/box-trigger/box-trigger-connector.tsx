import React, { useEffect } from 'react';

import type { Trigger } from '@/editor/domain/trigger';
import { useHorizontalListener } from '@/editor/stores';

type Props = { trigger: Trigger | null };

export const BoxTriggerConnector: React.FC<Props> = ({ trigger }) => {
  const { addListener, listeners } = useHorizontalListener();

  useEffect(() => {
    if (!trigger) {
      return;
    }

    addListener(trigger);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <path
      key={trigger}
      className="z-index-10 stroke-[4px] transition-[stroke] stroke-indigo-500"
      d={listeners[trigger as Trigger]}
    />
  );
};

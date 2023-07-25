import React, { useEffect } from 'react';

import {
  BoxName,
  BoxTrigger,
  Features,
  GlobalDrag,
  Visualiser,
} from '@/components';

import { useThemeModeLoader } from './stores';

const Root = () => (
  <main
    className="overflow-hidden bg-[linear-gradient(#e8e8e8_1px,transparent_0),linear-gradient(90deg,#e8e8e8_1px,#f8f8f8_0)] dark:bg-[linear-gradient(#475569_1px,transparent_0),linear-gradient(90deg,#475569_1px,#111827_0)] bg-[length:50px_50px]"
    id="main"
  >
    <GlobalDrag>
      <BoxName />
      <BoxTrigger />
    </GlobalDrag>
    <Visualiser />
    <Features />
  </main>
);

export const App: React.FC = () => {
  const { onLoadMode } = useThemeModeLoader();

  useEffect(() => {
    onLoadMode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Root />;
};

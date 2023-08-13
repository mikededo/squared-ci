'use client';

import dynamic from 'next/dynamic';
import React, { useEffect } from 'react';

import {
  BoxConcurrency,
  BoxEnv,
  BoxName,
  BoxPermissions,
  BoxTrigger,
  Features,
  GlobalDrag,
  Menu,
  News,
  Visualiser,
} from '@/editor/components';
import { useThemeModeLoader } from '@/editor/stores';

const Editor: React.FC = () => {
  const { onLoadMode } = useThemeModeLoader();

  useEffect(() => {
    onLoadMode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="overflow-hidden bg-paper bg-paper-size" id="main">
      <News />
      <GlobalDrag>
        <BoxName />
        <BoxTrigger />
        <BoxPermissions />
        <BoxEnv />
        <BoxConcurrency />
      </GlobalDrag>
      <Menu />
      <Features />
      <Visualiser />
    </main>
  );
};

// Force it to be CSR
export default dynamic(() => Promise.resolve(Editor), { ssr: false });

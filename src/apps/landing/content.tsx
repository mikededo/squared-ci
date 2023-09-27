import React from 'react';

import { Grid } from '@/aero';
import {
  BorderedBox,
  Footer,
  LiveChanges,
  MainHeader,
  Nav,
  PreviewHeader,
  YamlEditor,
} from '@/landing/components';

export const Content: React.FC = () => (
  <>
    <Nav />
    <main className="flex flex-col items-center mt-6 md:mt-12" id="main">
      <Grid container className="w-full">
        <MainHeader />
        <BorderedBox className="h-8" columns={12} bottom />
        <PreviewHeader />
        <LiveChanges />
        <YamlEditor />
      </Grid>
    </main>
    <Footer />
  </>
);

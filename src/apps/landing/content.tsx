import React from 'react';

import { Grid } from '@/aero';
import {
  Footer,
  LiveChanges,
  MainHeader,
  Nav,
  PreviewHeader,
} from '@/landing/components';

export const Content: React.FC = () => (
  <>
    <Nav />
    <main className="flex flex-col items-center mt-6 md:mt-12" id="main">
      <Grid container className="w-full">
        <MainHeader />
        <PreviewHeader />
        <LiveChanges />
      </Grid>
    </main>
    <Footer />
  </>
);

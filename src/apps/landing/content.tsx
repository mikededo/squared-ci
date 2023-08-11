import React from 'react';

import { Grid } from '@/aero';
import { Header, LiveChanges, Nav, PreviewHeader } from '@/landing/sections';

export const Content: React.FC = () => (
  <>
    <Nav />
    <main
      className="flex flex-col items-center mt-6 md:mt-12 md:mx-4"
      id="main"
    >
      <Grid container className="w-full md:max-w-[90%]">
        <Header />
        <PreviewHeader />
        <LiveChanges />
      </Grid>
    </main>
  </>
);

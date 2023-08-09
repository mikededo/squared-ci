import Head from 'next/head';
import React from 'react';

import { Content } from '@/landing/content';

const Landing: React.FC = () => (
  <>
    <Head>
      <title>Squared CI</title>
      <meta
        name="description"
        content="Squared CI the no-code platform for building Github Actions workflows"
        key="description"
      />
    </Head>
    <Content />
  </>
);

export default Landing;

import { MarkGithubIcon } from '@primer/octicons-react';
import React from 'react';

import { Banner, Button, Grid, Meta, Row, VCol } from '@/aero';
import { BorderedBox } from '@/landing/components';

import { HeaderLink } from './header-link';

export const Header: React.FC = () => (
  <>
    <Grid item columns={10} offset={1}>
      <Banner
        main="Thanks for passing by!"
        className="px-6 w-full animate-pulse md:-mt-6 mb-6"
      >
        <span>
          {' '}
          This landing page has been inspired by Next.js documentation. You can
          check it in{' '}
          <a href="https://nextjs.dev" className="underline">
            their site!
          </a>
        </span>
      </Banner>
    </Grid>
    <Grid item columns={12}>
      <BorderedBox bottom className="px-6 pt-4 pb-12 md:py-8 md:border-y">
        <h1 className="text-5xl font-bold text-center">
          <span className="text-indigo-500">No-code</span> editor for Github
          Actions
        </h1>
      </BorderedBox>
    </Grid>
    <BorderedBox columns={12} x bottom>
      <VCol className="px-6 py-4" align="center" variant="md">
        <p className="text-lg text-center">
          Squared CI is a no-code editor for building Github Actions. It allows
          you to build workflows without having to write any YAML. It also
          provides a visualiser to help you understand your workflows.
        </p>
        <Meta>Open source, hosted in Vercel.</Meta>
        <Button className="bg-slate-700 hover:bg-slate-800 dark:bg-extra dark:hover:bg-extra/80">
          <Row align="center" variant="lg">
            <MarkGithubIcon />
            <a href="https://github.com/mikededo/squared-ci">Github</a>
          </Row>
        </Button>
      </VCol>
    </BorderedBox>
    <HeaderLink />
  </>
);

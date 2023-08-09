import { MarkGithubIcon } from '@primer/octicons-react';
import React from 'react';

import { Button, Meta, Row, VCol } from '@/aero';

import { HeaderLink } from './header-link';

export const Header: React.FC = () => (
  <>
    <div className="mx-auto w-fit py-2 px-8 rounded-lg text-center md:-mt-4 mb-6 bg-indigo-300 dark:bg-slate-700 text-sm">
      <strong className="font-semibold inline-block">
        Thanks for passing by!
      </strong>{' '}
      <span>
        This landing page has been inspired by Next.js documentation. You can
        check it in{' '}
        <a href="https://nextjs.dev" className="underline">
          their site!
        </a>
      </span>
    </div>
    <div className="px-6 pt-4 pb-12 md:py-8 border-b md:border-y border-dashed border-gray-300">
      <h1 className="text-5xl font-bold text-center">
        <span className="text-indigo-500">No-code</span> editor for Github
        Actions
      </h1>
    </div>
    <VCol
      className="px-6 py-4 md:border-x border-b border-dashed border-gray-300"
      align="center"
      variant="md"
    >
      <p className="text-lg text-center">
        Squared CI is a no-code editor for building Github Actions. It allows
        you to build workflows without having to write any YAML. It also
        provides a visualiser to help you understand your workflows.
      </p>
      <Meta className="text-slate-600">Open source, hosted in Vercel.</Meta>
      <Button className="bg-slate-700 hover:bg-slate-800 active:bg-slate-900">
        <Row align="center" variant="lg">
          <MarkGithubIcon />
          <a href="https://github.com/mikededo/squared-ci">Github</a>
        </Row>
      </Button>
    </VCol>
    <HeaderLink />
  </>
);

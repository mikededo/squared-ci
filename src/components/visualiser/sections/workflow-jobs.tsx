import React from 'react';

import { Comment, Keyword, Line, Tabbed } from '@/components';

export const WorkflowJobs: React.FC = () => (
  <>
    <Line>
      <Comment># The following code is just an example</Comment>
    </Line>
    <Line>
      <Keyword>jobs</Keyword>:
    </Line>
    <Tabbed tabs={2}>
      <Keyword>build</Keyword>:
    </Tabbed>
    <Tabbed tabs={4}>
      <Keyword>runs-on</Keyword>: ubuntu-latest
    </Tabbed>
    <Tabbed tabs={4}>
      <Keyword>if</Keyword>: github.event.pull_request.merged == true
    </Tabbed>
    <Tabbed tabs={4}>
      <Keyword>steps</Keyword>:
    </Tabbed>
    <Tabbed tabs={6}>
      - <Keyword>name</Keyword>: Install dependencies
    </Tabbed>
    <Tabbed tabs={8}>
      <Keyword>run</Keyword>: yarn install --frozen-lockfile
    </Tabbed>
    <Tabbed tabs={6}>
      - <Keyword>name</Keyword>: Run tests
    </Tabbed>
    <Tabbed tabs={8}>
      <Keyword>run</Keyword>: yarn lint && yarn test
    </Tabbed>
    <Tabbed tabs={6}>
      - <Keyword>name</Keyword>: Build the application
    </Tabbed>
    <Tabbed tabs={8}>
      <Keyword>run</Keyword>: yarn build
    </Tabbed>
  </>
);

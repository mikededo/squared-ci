import React from 'react';

import { Comment, Keyword, Line, List, Tabbed } from '../shared';

export const WorkflowTriggers: React.FC = () => (
  <>
    <Line>
      <Comment># The following code is just a preview.</Comment>
    </Line>
    <Line>
      <Keyword>on</Keyword>:
    </Line>
    <Tabbed tabs={2}>
      <Keyword>pull_request</Keyword>:
    </Tabbed>
    <List tabFactor={2} group="types" items={['merge', 'push', 'comment']} />
    <List
      tabFactor={2}
      group="branches"
      items={['main', 'preview']}
      asBulletList
    />
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

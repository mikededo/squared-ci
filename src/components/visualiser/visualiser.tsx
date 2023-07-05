import React from 'react';

import { Divider } from '@/components';

import { WorkflowBasics } from './sections';
import { Comment, Keyword, Line, Tabbed } from './shared';

export const Visualiser: React.FC = () => (
  <article className="fixed right-4 top-4 bottom-4 min-w-[320px] max-w-[520px] w-1/2 bg-white overflow-x-auto px-4 pt-2 pb-4 border border-slate-200 rounded-lg">
    <h1 className="text-lg font-bold mb-2">action.yaml</h1>
    <Divider />
    <div className="relative w-full mt-2">
      <Line>
        <Comment>
          # Want to see changes? Start updating the &quot;Workflow basics&quot;
          box
        </Comment>
      </Line>
      <WorkflowBasics />
      <Line>
        <Comment># The following code is just a preview.</Comment>
      </Line>
      <Line>
        <Keyword>on</Keyword>:
      </Line>
      <Tabbed tabs={2}>
        <Keyword>pull_request</Keyword>:
      </Tabbed>
      <Tabbed tabs={4}>
        <Keyword>types</Keyword>: [&apos;opened&apos;, &apos;merged&apos;]
      </Tabbed>
      <Tabbed tabs={4}>
        <Keyword>branches</Keyword>: [&apos;main&apos;, &apos;preview&apos;]
      </Tabbed>
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
        <Keyword>- name</Keyword>: Install dependencies
      </Tabbed>
      <Tabbed tabs={8}>
        <Keyword>run</Keyword>: yarn install --frozen-lockfile
      </Tabbed>
      <Tabbed tabs={6}>
        <Keyword>- name</Keyword>: Run tests
      </Tabbed>
      <Tabbed tabs={8}>
        <Keyword>run</Keyword>: yarn lint && yarn test
      </Tabbed>
      <Tabbed tabs={6}>
        <Keyword>- name</Keyword>: Build the application
      </Tabbed>
      <Tabbed tabs={8}>
        <Keyword>run</Keyword>: yarn build
      </Tabbed>
    </div>
  </article>
);

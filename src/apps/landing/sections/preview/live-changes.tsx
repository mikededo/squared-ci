import { ArrowDownIcon, ArrowLeftIcon } from '@primer/octicons-react';
import React from 'react';

import {
  Comment,
  DraggableTitle,
  Input,
  Keyword,
  Line,
  Row,
  VCol,
} from '@/aero';

export const LiveChanges: React.FC = () => (
  <>
    <Row
      className="py-2 px-4 md:px-0 md:py-4"
      variant="lg"
      justify="center"
      align="center"
    >
      <ArrowDownIcon />
      <h3 className="font-semibold text-lg text-center">
        Visualise the resulting output as you are building
      </h3>
      <ArrowDownIcon />
    </Row>
    <div className="grid grid-cols-1 md:grid-cols-3 border-y border-dashed border-gray-300">
      <div className="p-6 flex justify-center bg-[linear-gradient(#e8e8e8_1px,transparent_0),linear-gradient(90deg,#e8e8e8_1px,transparent_0)] dark:bg-[linear-gradient(#475569_1px,transparent_0),linear-gradient(90deg,#475569_1px,#111827_0)] bg-[length:50px_50px] bg-center">
        <div className="rounded-lg bg-white w-full transition-colors border hover:border-indigo-400 dark:bg-slate-800 dark:border-slate-400 border-slate-200">
          <DraggableTitle title="Workflow basics" />
          <div className="px-3 pb-3 pt-1.5 flex flex-col gap-2">
            <Input placeholder="Job name" />
            <Input placeholder="Run name" />
          </div>
        </div>
      </div>
      <VCol className="md:border-l border-t border-dashed border-gray-300 md:col-span-2 p-6">
        <Line>
          <Comment>
            # Edit the values of the boxes and preview the results in the #
            visualiser!
          </Comment>
        </Line>
        <VCol>
          <Line>
            {/* TODO: Show the arrow on input focus and on type */}
            <Keyword>name</Keyword>: Job name <ArrowLeftIcon />
          </Line>
          <Line>
            {/* TODO: Show the arrow on input focus and on type */}
            <Keyword>run-name</Keyword>: Run name <ArrowLeftIcon />
          </Line>
        </VCol>
      </VCol>
    </div>
  </>
);

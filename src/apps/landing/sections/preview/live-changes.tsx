import { ArrowDownIcon, ArrowLeftIcon } from '@primer/octicons-react';
import React from 'react';

import {
  Comment,
  DraggableTitle,
  Grid,
  Input,
  Keyword,
  Line,
  Row,
  VCol,
} from '@/aero';
import { BorderedBox } from '@/landing/components';

export const LiveChanges: React.FC = () => (
  <>
    <BorderedBox columns={12} bottom>
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
    </BorderedBox>
    <Grid item container columns={12} size={12}>
      <BorderedBox columns={12} sm={6} md={4} lg={3} right bottom>
        <div className="p-6 flex justify-center bg-paper bg-paper-size bg-center">
          <div className="rounded-lg bg-card w-full transition-colors border hover:border-extra">
            <DraggableTitle title="Workflow basics" />
            <div className="px-3 pb-3 pt-1.5 flex flex-col gap-2">
              <Input placeholder="Job name" />
              <Input placeholder="Run name" />
            </div>
          </div>
        </div>
      </BorderedBox>
      <BorderedBox columns={12} sm={6} md={8} lg={9} bottom>
        <VCol className="p-6">
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
      </BorderedBox>
    </Grid>
  </>
);

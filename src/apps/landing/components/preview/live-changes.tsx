import { ArrowDownIcon } from '@primer/octicons-react';
import React from 'react';

import { Grid, Row } from '@/aero';
import { BorderedBox, WorkflowBasics } from '@/landing/components';

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
      <WorkflowBasics />
    </Grid>
  </>
);

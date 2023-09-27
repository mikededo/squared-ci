import React from 'react';

import { Grid } from '@/aero';
import { WorkflowBasics } from '@/landing/components';

import { ItemHeader } from './item-header';

export const LiveChanges: React.FC = () => (
  <>
    <ItemHeader title="Visualise the resulting output as you are building" />
    <Grid item container columns={12} size={12}>
      <WorkflowBasics />
    </Grid>
  </>
);

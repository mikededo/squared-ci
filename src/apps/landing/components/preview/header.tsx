import React from 'react';

import { Grid, Meta, VCol } from '@/aero';
import { BorderedBox } from '@/landing/components';

export const PreviewHeader: React.FC = () => (
  <Grid item container columns={12}>
    <BorderedBox columns={1} sm={3} bottom right />
    <BorderedBox bottom columns={10} sm={6}>
      <VCol className="text-center" align="center">
        <h2 className="font-semibold text-2xl md:text-3xl py-3 md:py-6">
          Squared <span className="text-indigo-500">CI</span> features
        </h2>
        <BorderedBox top className="p-3">
          <Meta>Preview some of the most loved features of Squared CI</Meta>
        </BorderedBox>
      </VCol>
    </BorderedBox>
    <BorderedBox columns={1} sm={3} bottom left />
  </Grid>
);

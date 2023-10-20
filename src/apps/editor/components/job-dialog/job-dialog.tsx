import React from 'react';
import { createPortal } from 'react-dom';

import { Dialog, Grid } from '@/aero';

import { DialogContent } from './dialog-content';
import { DialogMenu } from './dialog-menu';

export const JobDialog: React.FC = () => {
  const portal = createPortal(
    <Dialog blur expanded>
      <Grid className="h-full" container>
        <Grid item columns={4}>
          <DialogMenu />
        </Grid>
        <Grid item columns={8}>
          <DialogContent />
        </Grid>
      </Grid>
    </Dialog>,
    document.body,
  );

  return <>{portal}</>;
};

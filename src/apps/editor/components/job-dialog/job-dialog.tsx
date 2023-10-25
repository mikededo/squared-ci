import React from 'react';
import { createPortal } from 'react-dom';

import { Dialog, Grid } from '@/aero';

import { DialogContent } from './dialog-content';
import { DialogMenu } from './dialog-menu';

export const JobDialog: React.FC = () => {
  const portal = createPortal(
    <Dialog show blur expanded>
      <Grid container className="h-full">
        <Grid item columns={4}>
          <DialogMenu />
        </Grid>
        <Grid item columns={8} className="max-h-full overflow-y-auto">
          <DialogContent />
        </Grid>
      </Grid>
    </Dialog>,
    document.body,
  );

  return <>{portal}</>;
};

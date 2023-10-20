import React from 'react';

import { VCol } from '@/aero';

import { ContenSwitcher } from './content-switches';
import { DialogNavigation } from './dialog-navigation';

export const DialogContent: React.FC = () => (
  <VCol className="w-full h-full items-stretch">
    <h3 className="p-4 text-2xl font-semibold">Selected section</h3>
    <div className="pr-8 pb-4 w-full flex-1">
      <div className="py-4 px-5 rounded-md bg-muted/75 dark:bg-muted/50 h-full">
        <ContenSwitcher />
      </div>
    </div>
    <DialogNavigation />
  </VCol>
);

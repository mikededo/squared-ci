import React from 'react';

import { VCol } from '@/aero';

import { ContentSwitcher } from './content-switcher';
import { DialogNavigation } from './dialog-navigation';
import { DialogTitle } from './dialog-title';

export const DialogContent: React.FC = () => (
  <VCol className="w-full h-full items-stretch gap-0">
    <DialogTitle />
    <div className="pl-4 pr-6 pb-4 w-full relative overflow-y-auto flex-1">
      <ContentSwitcher />
    </div>
    <DialogNavigation />
  </VCol>
);

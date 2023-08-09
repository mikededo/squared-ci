import React from 'react';

import { VCol } from '@/aero';

export const PreviewHeader: React.FC = () => (
  <div className="grid grid-cols-4">
    <div className="border-b border-dashed border-gray-300" />
    <VCol
      className="text-center border-x border-b border-dashed border-gray-300 col-span-2 col-start-2"
      align="center"
    >
      <h2 className="font-semibold text-2xl py-3">
        Squared <span className="text-indigo-500">CI</span> features
      </h2>
      <p className="border-t border-dashed border-gray-300 p-2 text-sm text-slate-500 w-full">
        Preview some of the most loved features of Squared CI
      </p>
    </VCol>
    <div className="border-b border-dashed border-gray-300" />
  </div>
);

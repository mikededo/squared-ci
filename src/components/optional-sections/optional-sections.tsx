import React from 'react';

import { AppearTransition, Label, VCol } from '@/sd';

import { OptionalSection } from './optional-section';

type Props = {
  show?: boolean;
};

export const OptionalSections: React.FC<Props> = ({ show = false }) => (
  <AppearTransition as={React.Fragment} show={show}>
    <div
      className="absolute transition-all top-14 w-[300px] min-h-[140px] bg-white dark:bg-slate-800 px-3 py-2 border border-slate-200 dark:border-slate-400 rounded-lg -translate-x-1/4"
    >
      <VCol variant="md">
        <VCol variant="xs">
          <p className="font-semibold">Enabled sections</p>
          <Label>
            There are some configurations that are not strictly required, such
            as the pemissions. In case you want to show them, enable them
            through this menu.
          </Label>
        </VCol>
        <VCol>
          <OptionalSection text="Permissions" section="osPermissions" />
          <OptionalSection text="Env (coming soon)" section="osEnv" disabled />
          <OptionalSection
            text="Defaults (coming soon)"
            section="osDefaults"
            disabled
          />
          <OptionalSection
            text="Concurrency (coming soon)"
            section="osConcurrency"
            disabled
          />
        </VCol>
      </VCol>
    </div>
  </AppearTransition>
);

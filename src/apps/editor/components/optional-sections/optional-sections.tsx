import React from 'react';

import { AppearTransition, Label, VCol } from '@/aero';

import { OptionalSection } from './optional-section';

type Props = {
  show?: boolean;
};

export const OptionalSections: React.FC<Props> = ({ show = false }) => (
  <AppearTransition as={React.Fragment} show={show}>
    <div className="absolute transition-all top-14 w-[300px] min-h-[140px] bg-card px-3 py-2 border rounded-lg -translate-x-1/4">
      <VCol variant="md">
        <VCol variant="xs">
          <p className="font-semibold">Enabled sections</p>
          <Label>
            There are some configurations that are not strictly required, such
            as the pemissions. In case you want to show them, enable them
            through this menu.
          </Label>
        </VCol>
        <VCol className="w-full" align="between">
          <OptionalSection text="Permissions" section="osPermissions" />
          <OptionalSection text="Env" section="osEnv" />
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

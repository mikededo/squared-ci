import React from 'react';

import { Toggle } from '@/aero';
import type { OptionalSections } from '@/editor/domain/optional-sections';
import { useOptionalSection } from '@/editor/stores';

type OptionalSectionProps = {
  text: string;
  section: OptionalSections;
  disabled?: boolean;
};

export const OptionalSection: React.FC<OptionalSectionProps> = ({
  text,
  section,
  disabled,
}) => {
  const { [section]: isActive, toggleOS } = useOptionalSection(section);

  return (
    <Toggle
      text={text}
      condensed
      value={isActive}
      onClick={toggleOS}
      disabled={disabled}
    />
  );
};

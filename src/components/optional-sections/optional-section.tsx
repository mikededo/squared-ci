import React from 'react';

import type { OptionalSections } from '@/domain/optional-sections';
import { Toggle } from '@/sd';
import { useOptionalSection } from '@/stores';

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

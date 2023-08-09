import { KeyIcon } from '@primer/octicons-react';
import { atom, useAtom } from 'jotai';
import React, { useMemo } from 'react';

import { IconButton } from '@/aero';
import { OptionalSections } from '@/editor/components';

export const OptionalSectionsMenuOption: React.FC = () => {
  const [opened, setOpened] = useAtom(useMemo(() => atom(false), []));

  const onToggleStatus = () => {
    setOpened((prev) => !prev);
  };

  return (
    <>
      <IconButton
        tooltip="Show optional sections"
        className="!p-2"
        selected={opened}
        onClick={onToggleStatus}
      >
        <KeyIcon />
      </IconButton>
      <OptionalSections show={opened} />
    </>
  );
};

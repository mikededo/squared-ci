import { KeyIcon } from '@primer/octicons-react';
import { atom, useAtom } from 'jotai';
import React, { useMemo } from 'react';

import { OptionalSections } from '@/components';
import { IconButton } from '@/sd';

export const OptionalSectionsMenuOption: React.FC = () => {
  const [opened, setOpened] = useAtom(useMemo(() => atom(false), []));

  const onToggleStatus = () => {
    setOpened((prev) => !prev);
  };

  return (
    <>
      <IconButton className="!p-2" selected={opened} onClick={onToggleStatus}>
        <KeyIcon />
      </IconButton>
      <OptionalSections show={opened} />
    </>
  );
};

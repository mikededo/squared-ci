import React from 'react';

import { Divider, Input } from '@/aero';
import { useWorkflowInfoStore } from '@/editor/stores';

export const Header: React.FC = () => {
  const {
    info: { fileName },
    onChangeFileName,
  } = useWorkflowInfoStore();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeFileName(e.currentTarget.value);
  };

  return (
    <>
      <Input
        className="text-lg font-bold mt-1 mb-3"
        value={fileName}
        onChange={handleOnChange}
        variant="plain"
      />
      <Divider />
    </>
  );
};

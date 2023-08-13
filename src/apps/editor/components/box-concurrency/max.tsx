import React from 'react';

import { Input, Label, VCol } from '@/aero';
import { useAdvancedInput } from '@/editor/hooks';
import { useWorkflowConcurrency } from '@/editor/stores';

export const Max: React.FC = () => {
  const {
    concurrency: { max },
    onChangeMax,
  } = useWorkflowConcurrency();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeMax(+e.target.value);
  };

  const { onKeyDown } = useAdvancedInput(String(max), {
    numOnly: true,
  });

  return (
    <VCol variant="md">
      <Label className="text-muted-foreground">Max</Label>
      <Input onKeyDown={onKeyDown} onChange={handleOnChange} placeholder="2" />
    </VCol>
  );
};

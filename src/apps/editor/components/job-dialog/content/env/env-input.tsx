import React from 'react';

import { Button, Input, Row, VCol } from '@/aero';
import { useAdvancedInput, useInput, useSelectedJobId } from '@/editor/hooks';
import { useJobEnv } from '@/editor/stores';

export const EnvInput: React.FC = () => {
  const jobId = useSelectedJobId();
  const { onAddEnv } = useJobEnv(jobId ?? '');

  const [keyMethods] = useAdvancedInput('', {
    spaceAsUnderscore: true,
  });
  const valueMethods = useInput();

  const handleOnAdd = () => {
    onAddEnv(keyMethods.value, valueMethods.value);
  };

  return (
    <VCol expand>
      <Row expand>
        <VCol expand>
          <p className="text-xs font-semibold">Key</p>
          <Input
            variant="plain"
            placeholder="ENV_KEY"
            className="uppercase"
            {...keyMethods}
          />
        </VCol>
        <VCol expand>
          <p className="text-xs font-semibold">Value</p>
          <Input variant="plain" placeholder="Env value" {...valueMethods} />
        </VCol>
      </Row>
      <Button
        type="submit"
        variant="text"
        className="self-end"
        disabled={!(keyMethods.value && valueMethods.value)}
        onClick={handleOnAdd}
        condensed
      >
        Add entry
      </Button>
    </VCol>
  );
};

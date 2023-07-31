import { CopyIcon } from '@primer/octicons-react';
import React from 'react';

import { Button, Row } from '@/sd';
import { useFeatureSwitch } from '@/stores';

export const Footer: React.FC = () => {
  const { fsCopyAction } = useFeatureSwitch('fsCopyAction');

  return !fsCopyAction ? null : (
    <div className="self-end">
      <Button disabled>
        <Row variant="md">
          <CopyIcon />
          Copy
        </Row>
      </Button>
    </div>
  );
};

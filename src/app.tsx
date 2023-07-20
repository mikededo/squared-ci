import React from 'react';

import { BoxName, BoxTrigger, GlobalDrag, Visualiser } from '@/components';

const Root = () => (
  <main
    style={{
      backgroundImage:
        'linear-gradient(#e8e8e8 1px,transparent 0),linear-gradient(90deg, #e8e8e8 1px, #f8f8f8 0)',
      backgroundSize: '50px 50px',
    }}
    className="overflow-hidden"
    id="main"
  >
    <GlobalDrag>
      <BoxName />
      <BoxTrigger />
    </GlobalDrag>
    <Visualiser />
  </main>
);

export const App: React.FC = () => <Root />;

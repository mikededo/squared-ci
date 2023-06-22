import React from 'react';

import { BoxName } from '@/components';

const Root = () => (
  <main
    style={{
      backgroundImage:
        'linear-gradient(#e8e8e8 1px,transparent 0),linear-gradient(90deg, #e8e8e8 1px, #f8f8f8 0)',
      backgroundSize: '50px 50px',
    }}
    className="h-screen w-screen relative overflow-hidden"
  >
    <BoxName />
  </main>
);

export const App: React.FC = () => <Root />;

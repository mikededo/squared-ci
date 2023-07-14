import type { PropsWithChildren } from 'react';
import React from 'react';

import { Comment, Line } from '../shared';

export const Main: React.FC<PropsWithChildren> = ({ children }) => (
  <div className="relative w-full mt-2">
    <Line>
      <Comment>
        # Want to see changes? Start updating the &quot;Workflow basics&quot;
        box
      </Comment>
    </Line>
    {children}
  </div>
);

import { ArrowLeftIcon } from '@primer/octicons-react';
import React from 'react';

import { Comment, Keyword, Line, VCol } from '@/aero';
import { BorderedBox } from '@/landing/components';

type Props = {
  jobName: string;
  jobNameFocused: boolean;
  runName: string;
  runNameFocused: boolean;
};

type VisualiserValueProps = {
  value: string;
  focused: boolean;
  fallback: string;
};

const VisualiserValue: React.FC<VisualiserValueProps> = ({
  value,
  focused,
  fallback,
}) => (
  <>
    {`: ${value === '' ? fallback : value} `}
    {!focused ? null : <ArrowLeftIcon />}
  </>
);

export const Visualiser: React.FC<Props> = ({
  jobName,
  jobNameFocused,
  runName,
  runNameFocused,
}) => (
  <BorderedBox columns={12} sm={6} md={8} lg={9} bottom>
    <VCol className="p-6">
      <Line>
        <Comment>
          # Edit the values of the boxes and preview the results in the #
          visualiser!
        </Comment>
      </Line>
      <VCol>
        <Line>
          {/* TODO: Show the arrow on input focus and on type */}
          <Keyword>name</Keyword>
          <VisualiserValue
            value={jobName}
            focused={jobNameFocused}
            fallback="Job name"
          />
        </Line>
        <Line>
          {/* TODO: Show the arrow on input focus and on type */}
          <Keyword>run-name</Keyword>
          <VisualiserValue
            value={runName}
            focused={runNameFocused}
            fallback="Run name"
          />
        </Line>
      </VCol>
    </VCol>
  </BorderedBox>
);

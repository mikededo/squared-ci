import React, { useRef } from 'react';

import {
  Chip,
  ChipWrapper,
  Draggable,
  DraggableTitle,
  DraggableWrapper,
  Input,
  Meta,
  VCol,
} from '@/aero';
import { Positions } from '@/editor/config';
import { useAdvancedInput } from '@/editor/hooks';
import { useOptionalSection, useWorkflowEnv } from '@/editor/stores';

const EnvRegex = /^([a-zA-Z0-9_]+)=(.+)$/;

export const BoxEnvContent: React.FC = () => {
  const { variables, addVariable, deleteVariable } = useWorkflowEnv();
  const methods = useAdvancedInput('', {
    onEnterPress: (value, helpers) => {
      if (!EnvRegex.test(value)) {
        return;
      }

      addVariable(value);
      helpers.onResetInput();
    },
  });

  const handleOnVariableClick = (variable: string) => () => {
    deleteVariable(variable);
  };

  return (
    <DraggableWrapper>
      <VCol className="max-w-xs" variant="lg">
        <DraggableWrapper>
          <Meta>
            Enter your environment variables. Use the format{' '}
            <span className="font-mono">KEY=VALUE</span> and it will
            automatically be parsed.
            <br />
            The key will be uppercased.
          </Meta>
          {variables.size ? (
            <ChipWrapper variant="left" className="mx-0">
              {[...variables].map((variable) => (
                <Chip
                  key={variable}
                  text={variable}
                  onClick={handleOnVariableClick(variable)}
                  active
                />
              ))}
            </ChipWrapper>
          ) : null}
          <Input placeholder="ENV_NAME=ENV_VALUE" {...methods} />
        </DraggableWrapper>
      </VCol>
    </DraggableWrapper>
  );
};

export const BoxEnv: React.FC = () => {
  const innerRef = useRef<HTMLDivElement>(null);
  const { osEnv } = useOptionalSection('osEnv');

  return osEnv ? (
    <DraggableWrapper>
      <Draggable
        innerRef={innerRef}
        initialX={Positions.BoxEnvX}
        initialY={Positions.BoxEnvY}
      >
        <DraggableWrapper>
          <DraggableTitle title="Env variables" />
          <div className="px-3 pb-3">
            <BoxEnvContent />
          </div>
        </DraggableWrapper>
      </Draggable>
    </DraggableWrapper>
  ) : null;
};

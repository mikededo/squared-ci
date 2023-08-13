import React, { useRef } from 'react';

import {
  Draggable,
  DraggableTitle,
  DraggableWrapper,
  Input,
  Label,
  Toggle,
  VCol,
} from '@/aero';
import { Positions } from '@/editor/config';
import { useOptionalSection, useWorkflowConcurrency } from '@/editor/stores';

import { Max } from './max';

export const ConcurrencyContent = React.forwardRef<HTMLDivElement>((_, ref) => {
  const {
    concurrency: { cancelInProgress, group },
    onChangeGroup,
    toggleCancelInProgress,
  } = useWorkflowConcurrency();

  const handleOnChangeGroup = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeGroup(e.target.value);
  };

  return (
    <DraggableWrapper>
      <VCol
        ref={ref}
        variant="md"
        className="relative px-3 pb-3"
        align="between"
      >
        <DraggableWrapper>
          <Toggle
            text="Cancel in progress"
            value={cancelInProgress}
            onClick={toggleCancelInProgress}
          />
          <VCol variant="md">
            <Label className="text-muted-foreground">Group</Label>
            <Input
              placeholder="workflow-name"
              value={group}
              onChange={handleOnChangeGroup}
            />
          </VCol>
          <Max />
          <Label className="text-muted-foreground">
            Matrix (available soon)
          </Label>
        </DraggableWrapper>
      </VCol>
    </DraggableWrapper>
  );
});

export const BoxConcurrency: React.FC = () => {
  const innerRef = useRef(null);
  const { osConcurrency } = useOptionalSection('osConcurrency');

  return osConcurrency ? (
    <DraggableWrapper>
      <Draggable
        innerRef={innerRef}
        initialX={Positions.BoxEnvX}
        initialY={Positions.BoxEnvY}
        visible={({ ref, onExpand }) => (
          <DraggableWrapper>
            <div ref={ref}>
              <DraggableTitle title="Concurrency" onExpand={onExpand} />
            </div>
          </DraggableWrapper>
        )}
        invisible={({ ref }) => <ConcurrencyContent ref={ref} />}
      />
    </DraggableWrapper>
  ) : null;
};

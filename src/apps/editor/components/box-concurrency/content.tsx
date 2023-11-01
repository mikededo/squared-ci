import React from 'react';

import {
  Divider,
  DraggableWrapper,
  Input,
  Label,
  Toggle,
  VCol,
  useDialog,
} from '@/aero';
import type { YamlField } from '@/aero';
import { Matrix } from '@/editor/components';
import { useWorkflowConcurrency } from '@/editor/stores';

import { Max } from './max';
import { BoxButton } from '../box-button';

export const ConcurrencyContent = React.forwardRef<HTMLDivElement>((_, ref) => {
  const { show, onToggleDialog, onHideDialog } = useDialog();
  const {
    concurrency: { cancelInProgress, name, group },
    onChangeName,
    onChangeGroup,
    onChangeMatrix,
    toggleCancelInProgress,
  } = useWorkflowConcurrency();

  const handleOnChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeName(e.target.value);
  };

  const handleOnChangeGroup = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeGroup(e.target.value);
  };

  const handleOnSave = (fields: YamlField[]) => {
    onChangeMatrix(fields);
    onHideDialog();
  };

  return (
    <>
      <DraggableWrapper>
        <VCol
          ref={ref}
          variant="md"
          className="relative px-3 pb-3"
          align="between"
        >
          <DraggableWrapper>
            <VCol className="mb-1">
              <DraggableWrapper>
                <Label className="text-muted-foreground">Name</Label>
                <Input
                  placeholder="workflow-name"
                  value={name}
                  onChange={handleOnChangeName}
                />
                <Label className="text-muted-foreground max-w-[240px]">
                  Setting the name property will override the other properties
                </Label>
              </DraggableWrapper>
            </VCol>
            <Divider />
            <Toggle
              text="Cancel in progress"
              value={cancelInProgress}
              onClick={toggleCancelInProgress}
            />
            <VCol>
              <DraggableWrapper>
                <Label className="text-muted-foreground">Group</Label>
                <Input
                  placeholder="workflow-name"
                  value={group}
                  onChange={handleOnChangeGroup}
                />
              </DraggableWrapper>
            </VCol>
            <Max />
            <Label className="text-muted-foreground">Matrix</Label>
            <BoxButton title="Add matrix" onClick={onToggleDialog} />
          </DraggableWrapper>
        </VCol>
      </DraggableWrapper>
      <Matrix
        title="Create concurrency matrix"
        show={show}
        onClose={onToggleDialog}
        onDiscard={onToggleDialog}
        onSave={handleOnSave}
      />
    </>
  );
});

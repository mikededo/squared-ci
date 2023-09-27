import { ChevronRightIcon } from '@primer/octicons-react';
import { atom, useAtom } from 'jotai';
import React, { useMemo } from 'react';

import {
  Divider,
  DraggableWrapper,
  Input,
  Label,
  Meta,
  Row,
  Toggle,
  VCol,
} from '@/aero';
import type { YamlField } from '@/aero';
import { Matrix } from '@/editor/components';
import { useWorkflowConcurrency } from '@/editor/stores';

import { Max } from './max';

export const ConcurrencyContent = React.forwardRef<HTMLDivElement>((_, ref) => {
  const [showDialog, setShowDialog] = useAtom(useMemo(() => atom(false), []));
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

  const handleOnDialogToggle = () => {
    setShowDialog((prev) => !prev);
  };

  const handleOnSave = (fields: YamlField[]) => {
    onChangeMatrix(fields);
    setShowDialog(false);
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
                  Setting the name properties will override the other properties
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
            <button
              className="py-1.5 px-2 -mt-0.5 rounded-md border border-input hover:bg-muted transition-colors cursor-pointer text-muted-foreground"
              onClick={handleOnDialogToggle}
            >
              <Row align="center" justify="between">
                <DraggableWrapper>
                  <Meta className="text-muted-foreground">Add matrix</Meta>
                  <ChevronRightIcon className="fill-muted-foreground" />
                </DraggableWrapper>
              </Row>
            </button>
          </DraggableWrapper>
        </VCol>
      </DraggableWrapper>
      <Matrix
        title="Create concurrency matrix"
        show={showDialog}
        onClose={handleOnDialogToggle}
        onDiscard={handleOnDialogToggle}
        onSave={handleOnSave}
      />
    </>
  );
});

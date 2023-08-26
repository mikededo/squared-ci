import { ChevronRightIcon } from '@primer/octicons-react';
import { atom, useAtom } from 'jotai';
import React, { useMemo, useRef } from 'react';

import {
  Draggable,
  DraggableTitle,
  DraggableWrapper,
  Input,
  Label,
  Meta,
  Row,
  Toggle,
  VCol,
} from '@/aero';
import { Matrix } from '@/editor/components';
import { ActionsDocs, Positions } from '@/editor/config';
import type { Field } from '@/editor/domain/matrix';
import {
  useFeatureSwitch,
  useOptionalSection,
  useWorkflowConcurrency,
} from '@/editor/stores';

import { Max } from './max';

export const ConcurrencyContent = React.forwardRef<HTMLDivElement>((_, ref) => {
  const { fsMatrix } = useFeatureSwitch('fsMatrix');
  const [showDialog, setShowDialog] = useAtom(useMemo(() => atom(false), []));
  const {
    concurrency: { cancelInProgress, group },
    onChangeGroup,
    onChangeMatrix,
    toggleCancelInProgress,
  } = useWorkflowConcurrency();

  const handleOnChangeGroup = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeGroup(e.target.value);
  };

  const handleOnDialogToggle = () => {
    setShowDialog((prev) => !prev);
  };

  const handleOnSave = (fields: Field[]) => {
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
            <Toggle
              text="Cancel in progress"
              value={cancelInProgress}
              onClick={toggleCancelInProgress}
            />
            <VCol variant="md">
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
            <Label className="text-muted-foreground">
              Matrix {fsMatrix ? '' : '(coming soon)'}
            </Label>
            {fsMatrix ? (
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
            ) : null}
          </DraggableWrapper>
        </VCol>
      </DraggableWrapper>
      {fsMatrix ? (
        <Matrix
          title="Create concurrency matrix"
          show={showDialog}
          onClose={handleOnDialogToggle}
          onDiscard={handleOnDialogToggle}
          onSave={handleOnSave}
        />
      ) : null}
    </>
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
              <DraggableTitle
                title="Concurrency"
                docsHref={ActionsDocs.workflowConcurrency}
                onExpand={onExpand}
              />
            </div>
          </DraggableWrapper>
        )}
        invisible={({ ref }) => <ConcurrencyContent ref={ref} />}
      />
    </DraggableWrapper>
  ) : null;
};

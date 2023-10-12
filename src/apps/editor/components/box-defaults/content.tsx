import { ChevronRightIcon } from '@primer/octicons-react';
import React from 'react';

import type { YamlField } from '@/aero';
import { DraggableWrapper, Meta, Row, useDialog } from '@/aero';
import { useWorkflowDefaults } from '@/editor/stores';

import { Matrix } from '../matrix';

export const BoxDefaultsContent: React.FC = () => {
  const { show, onToggleDialog, onHideDialog } = useDialog();
  const {
    defaults: { matrix },
    onChangeMatrix,
  } = useWorkflowDefaults();

  const handleOnSave = (matrix: YamlField[]) => {
    onChangeMatrix(matrix);
    onHideDialog();
  };

  return (
    <>
      <DraggableWrapper>
        <button
          className="py-1.5 px-2 -mt-0.5 rounded-md border border-input hover:bg-muted transition-colors cursor-pointer text-muted-foreground w-full"
          onClick={onToggleDialog}
        >
          <Row align="center" justify="between">
            <DraggableWrapper>
              <Meta className="text-muted-foreground">
                {matrix.length ? 'Modify' : 'Add'} defaults
              </Meta>
              <ChevronRightIcon className="fill-muted-foreground" />
            </DraggableWrapper>
          </Row>
        </button>
      </DraggableWrapper>
      <Matrix
        title="Create defaults matrix"
        initialValue={matrix}
        show={show}
        onClose={onToggleDialog}
        onDiscard={onToggleDialog}
        onSave={handleOnSave}
      />
    </>
  );
};

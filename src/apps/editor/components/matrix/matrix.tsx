import React, { useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom';

import {
  AppearTransition,
  Banner,
  Button,
  Dialog,
  DialogHeader,
  Meta,
  Row,
  VCol,
} from '@/aero';
import type { Field } from '@/editor/domain/matrix';

import { AddButtons } from './add-buttons';
import { FormRenderer } from './form-renderer';
import { useFields } from './use-fields';

type Props = {
  title: string;
  show?: boolean;
  onClose?: () => void;
  onDiscard?: () => void;
  onSave: (fields: Field[]) => void;
};

export const Matrix: React.FC<Props> = ({
  title,
  show,
  onClose,
  onDiscard,
  onSave,
}) => {
  const {
    fields,
    hasChanges,
    onAddField,
    onFieldUpdate,
    onRemoveField,
    onUndo,
  } = useFields();

  const onCtrlZListener = useCallback(
    (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'z') {
        onUndo();
      }
    },
    [onUndo],
  );

  const handleOnSave = () => {
    onSave(fields);
  };

  useEffect(() => {
    if (show) {
      document.addEventListener('keydown', onCtrlZListener);
    } else {
      document.removeEventListener('keydown', onCtrlZListener);
    }

    return () => {
      document.removeEventListener('keydown', onCtrlZListener);
    };
  }, [show, onCtrlZListener]);

  return ReactDOM.createPortal(
    <Dialog show={show} blur>
      <VCol className="h-full w-full" variant="lg">
        <DialogHeader title={title} onClose={onClose} />
        <VCol className="px-5 flex-1 w-full overflow-y-auto" variant="lg">
          <Banner main="Tip!" className="w-full">
            {' '}
            Made a mistake? No worries, you can always undo your changes.
          </Banner>
          <Meta>Matrix properties</Meta>
          {fields.length ? (
            <VCol className="w-full" variant="md">
              {fields.map((field) => (
                <FormRenderer
                  key={field.id}
                  field={field}
                  path={[]}
                  onAddField={onAddField}
                  onFieldUpdate={onFieldUpdate}
                  onRemoveField={onRemoveField}
                />
              ))}
            </VCol>
          ) : null}
          <AddButtons onAddField={onAddField} path={[]} />
        </VCol>
        <Row className="p-5 pt-0 gap-2 self-end">
          <AppearTransition show={hasChanges}>
            <Button onClick={onDiscard} variant="danger">
              Discard
            </Button>
          </AppearTransition>
          <Button onClick={onClose} variant="text">
            Cancel
          </Button>
          <Button onClick={handleOnSave}>Save</Button>
        </Row>
      </VCol>
    </Dialog>,
    document.body,
  );
};

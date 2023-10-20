import React, { useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';

import type { YamlField } from '@/aero';
import {
  AddButtons,
  AppearTransition,
  Banner,
  Button,
  Dialog,
  DialogHeader,
  Meta,
  Row,
  VCol,
  YamlForm,
  useFields,
} from '@/aero';

type Props = {
  initialValue?: YamlField[];
  title: string;
  show?: boolean;
  onClose?: () => void;
  onDiscard?: () => void;
  onSave: (fields: YamlField[]) => void;
};

export const Matrix: React.FC<Props> = ({
  initialValue,
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
  } = useFields(initialValue);

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

  const portal = createPortal(
    <Dialog show={show} blur>
      <VCol className="h-full w-full" variant="lg">
        <DialogHeader title={title} onClose={onClose} />
        <VCol className="px-5 flex-1 w-full overflow-y-auto" variant="md">
          <Banner main="Tip!" className="w-full">
            {' '}
            Made a mistake? No worries, you can always undo your changes.
          </Banner>
          <Meta>Matrix properties</Meta>
          {fields.length ? (
            <VCol className="w-full" variant="none">
              {fields.map((field) => (
                <YamlForm
                  key={field.id}
                  field={field}
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

  return <>{portal}</>;
};

import React from 'react';
import ReactDOM from 'react-dom';

import {
  AppearTransition,
  Button,
  Dialog,
  DialogHeader,
  Meta,
  Row,
  VCol,
} from '@/aero';

import { AddButtons } from './add-buttons';
import { FormRenderer } from './form-renderer';
import { useFields } from './use-fields';
import { useMatrixChanges } from './use-matrix-changes';

type Props = {
  title: string;
  show?: boolean;
  onClose?: () => void;
  onConfirm?: () => void; // TODO: implement
  onDiscard?: () => void; // TODO: implement
};

export const Matrix: React.FC<Props> = ({ title, show, onClose }) => {
  const { changes: hasChanges } = useMatrixChanges();
  const { fields, onAddField, onFieldUpdate, onRemoveField } = useFields();

  return ReactDOM.createPortal(
    <Dialog show={show} blur>
      <VCol className="h-full w-full" variant="lg">
        <DialogHeader title={title} onClose={onClose} />
        <VCol className="px-5 flex-1 w-full overflow-y-auto" variant="lg">
          <Meta>Matrix properties</Meta>
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
          <AddButtons onAddField={onAddField} path={[]} />
        </VCol>
        <Row className="p-5 pt-0 gap-2 self-end">
          <AppearTransition show={hasChanges}>
            <Button onClick={console.log} variant="danger">
              Discard
            </Button>
          </AppearTransition>
          <Button onClick={console.log}>Save</Button>
        </Row>
      </VCol>
    </Dialog>,
    document.body,
  );
};

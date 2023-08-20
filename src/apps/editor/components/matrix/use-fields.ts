import { atom, useAtom } from 'jotai';

import type { Field } from '@/editor/domain/matrix';
import { useChangesStack } from '@/editor/hooks';

type Path = Array<Field['id']>;
export type UseFieldsResult = {
  fields: Field[];
  hasChanges: boolean;
  onAddField: (type: Field['type'], path: Path, as?: Field['as']) => () => void;
  onFieldUpdate: (
    id: Field['id'],
    path: Path,
    isChild?: boolean,
  ) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onRemoveField: (id: Field['id'], path: Path) => () => void;
  onUndo: () => void;
};

const matrixFields = atom<Field[]>([]);

const createNewField = (
  type: Field['type'],
  parent?: Field,
  as?: Field['as'],
): Field => {
  if (type === 'string') {
    const isInArray = parent?.type === 'array';
    return {
      id: Math.random().toString(),
      value: '',
      type: 'string',
      child: isInArray ? undefined : '',
      as: as ?? 'string',
    };
  } else {
    return { id: Math.random().toString(), value: '', type, child: [] };
  }
};

export const useFields = (parent?: Field): UseFieldsResult => {
  const [fields, setFields] = useAtom(matrixFields);
  const { hasChanges, onChange, onUndo } = useChangesStack<Field[]>();

  /**
   * Most of the checks that are done throught the code are to avoid
   * issues with typescript, but they could be skipped, as the code
   * functions should be called on correct arguments. This is the reason
   * why the undo-redo stack is being used, even though it could happen
   * that incorrect changes are recorded.
   * This function breaks immutability, but it simplifies the code update
   * as there can be infinite levels of nesting
   */
  const handleOnAddField: UseFieldsResult['onAddField'] =
    (type, path, as = 'string') => () => {
      onChange(fields);

      const field = createNewField(type, parent, as);
      // Hold a reference to the element to update
      let currentField = fields.find((field) => field.id === path[0]);
      // If the path is empty, it means that we are adding a new field to the root
      if (path.length === 0) {
        setFields([...fields, field]);
      }

      if (!currentField) {
        return;
      }

      // If the sliced path is empty, it means that we are adding to the
      // first level, without the need to iterate
      const restPath = path.slice(1);
      if (restPath.length === 0 && currentField.type !== 'string') {
        currentField.child.push(field);
        setFields([...fields]);
        return;
      }

      const shouldUpdate = restPath.every((id, index, { length }) => {
        if (!currentField) {
          return false;
        }

        const { type, child } = currentField;
        if ((!child && index < length - 1) || type === 'string') {
          return false;
        }

        currentField = child.find((field) => field.id === id);
        if (!currentField) {
          return false;
        }

        // If it is the last element, we should update the field
        if (index === length - 1 && currentField.type !== 'string') {
          currentField.child.push(field);
        }
        return true;
      });

      if (shouldUpdate) {
        // By simply changing the reference, we are updating the atom
        setFields([...fields]);
      }
    };

  /**
   * Most of the checks that are done throught the code are to avoid
   * issues with typescript, but they could be skipped, as the code
   * functions should be called on correct arguments.
   * This function breaks immutability, but it simplifies the code update
   * as there can be infinite levels of nesting
   * This function will record the changes to the undo-redo stack
   */
  const handleOnFieldUpdate: UseFieldsResult['onFieldUpdate'] =
    (id, path, isChild) => (e) => {
      const value = e.target.value;
      // If the path is empty, it means that we are adding a new field to the root
      if (path.length === 0) {
        const field = fields.find((field) => field.id === id);
        if (!field) {
          return;
        }

        // Check whether the field changing is the child value of a string
        if (field.type === 'string' && isChild) {
          field.child = value;
        } else {
          field.value = value;
        }

        setFields([...fields]);
        return;
      }

      // Hold a reference to the element to update
      let currentField = fields.find((field) => field.id === path[0]);
      if (!currentField) {
        return;
      }

      // If the sliced path is empty, it means that we are updating in the
      // first level, without the need to iterate
      const restPath = path.slice(1);
      if (restPath.length === 0 && currentField.type !== 'string') {
        const field = currentField.child.find((field) => field.id === id);
        if (!field) {
          return;
        }

        if (field.type === 'string' && isChild) {
          field.child = value;
        } else {
          field.value = value;
        }

        setFields([...fields]);
        return;
      }

      const shouldUpdate = restPath.every((parentId, index, { length }) => {
        if (!currentField) {
          return false;
        }

        const { type, child } = currentField;
        if ((child === undefined && index < length - 1) || type === 'string') {
          return false;
        }

        // Search for the new current field
        currentField = (child as Field[]).find(
          (field) => field.id === parentId,
        );
        if (!currentField) {
          return false;
        }

        // If it is the last element, we should update the field
        if (index === length - 1 && currentField.type === 'string') {
          if (isChild) {
            currentField.child = value;
          }
          currentField.value = value;
          return true;
        }

        if (index === length - 1 && currentField.type !== 'string') {
          const field = currentField.child.find((field) => field.id === id);
          if (!field) {
            return false;
          }

          if (field.type === 'string' && isChild) {
            field.child = value;
          } else {
            field.value = value;
          }
        }
        return true;
      });

      if (shouldUpdate) {
        // By simply changing the reference, we are updating the atom
        setFields([...fields]);
      }
    };

  /**
   * Most of the checks that are done throught the code are to avoid
   * issues with typescript, but they could be skipped, as the code
   * functions should be called on correct arguments. This is the reason
   * why the undo-redo stack is being used, even though it could happen
   * that incorrect changes are recorded.
   * This function breaks immutability, but it simplifies the code update
   * as there can be infinite levels of nesting.
   * This function will record the changes to the undo-redo stack
   */
  const handleOnRemoveField: UseFieldsResult['onRemoveField'] =
    (id, path) => () => {
      onChange(fields);

      if (path.length === 0) {
        setFields(fields.filter((field) => field.id !== id));
        return;
      }

      // Hold a reference to the element to update
      let currentField = fields.find((field) => field.id === path[0]);
      if (!currentField) {
        return;
      }

      const restPath = path.slice(1);
      if (restPath.length === 0) {
        if (currentField.type === 'string') {
          currentField.child = '';
          setFields([...fields]);
          return;
        }

        currentField.child = currentField.child.filter(
          (field) => field.id !== id,
        );
        setFields([...fields]);
        return;
      }

      const shouldUpdate = restPath.every((parentId, index, { length }) => {
        if (!currentField) {
          return false;
        }

        const { type, child } = currentField;
        if ((child === undefined && index < length - 1) || type === 'string') {
          // Dead end
          return false;
        }

        // Search for the new current field
        currentField = (child as Field[]).find(
          (field) => field.id === parentId,
        );
        if (!currentField) {
          return false;
        }

        if (index === length - 1 && currentField.type === 'string') {
          // Dead end
          return false;
        }

        // If it is the last element, we should remove the field
        if (index === length - 1 && currentField.type !== 'string') {
          const prevChildLength = currentField.child.length;
          currentField.child = currentField.child.filter(
            (child) => child.id !== id,
          );

          return prevChildLength !== currentField.child.length;
        }
        return true;
      });

      if (shouldUpdate) {
        // By simply changing the reference, we are updating the atom
        setFields([...fields]);
      }
    };

  const handleOnUndo = () => {
    const undone = onUndo();
    if (!undone) {
      return;
    }
    setFields(undone);
  };

  return {
    fields,
    hasChanges,
    onAddField: handleOnAddField,
    onFieldUpdate: handleOnFieldUpdate,
    onRemoveField: handleOnRemoveField,
    onUndo: handleOnUndo,
  };
};

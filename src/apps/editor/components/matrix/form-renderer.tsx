import { XIcon } from '@primer/octicons-react';
import React from 'react';
import { twMerge } from 'tailwind-merge';

import { IconInput, Input, Row, VCol } from '@/aero';
import type { Field } from '@/editor/domain/matrix';

import { AddButtons } from './add-buttons';
import type { UseFieldsResult } from './use-fields';

type Props = {
  field: Field;
  path: string[];
  onAddField: UseFieldsResult['onAddField'];
  onFieldUpdate: UseFieldsResult['onFieldUpdate'];
  onRemoveField: UseFieldsResult['onRemoveField'];
};

export const FormRenderer: React.FC<Props> = ({
  field,
  path,
  onAddField,
  onFieldUpdate,
  onRemoveField,
}) => {
  const depth = path.length;

  const { type } = field;

  if (type === 'string') {
    const { child, value, as } = field;
    const childPlaceholder =
      as === 'number'
        ? 'Number value'
        : as === 'boolean'
        ? 'Boolean value'
        : 'String value';

    return (
      <Row align="center" className={twMerge('w-full', depth > 0 && 'pl-4')}>
        <IconInput
          variant="plain"
          placeholder="String key"
          defaultValue={value}
          onBlur={onFieldUpdate(field.id, path)}
          icon={<XIcon className="text-muted-foreground" />}
          onIconClick={onRemoveField(field.id, path)}
        />
        {child !== undefined ? (
          <>
            <span>: </span>
            <Input
              variant="plain"
              placeholder={childPlaceholder}
              defaultValue={child}
              onBlur={onFieldUpdate(field.id, path, true)}
              type={as === 'number' ? 'number' : 'string'}
            />
          </>
        ) : null}
      </Row>
    );
  }

  const { child, value } = field;
  const childPath = [...path, field.id];
  return (
    <VCol variant="md" className={twMerge('w-full', depth > 0 && 'pl-4')}>
      <IconInput
        variant="plain"
        defaultValue={value}
        placeholder={`${type === 'array' ? 'Array' : 'Object'} key`}
        onBlur={onFieldUpdate(field.id, path)}
        icon={<XIcon className="text-muted-foreground" />}
        onIconClick={onRemoveField(field.id, path)}
        multiline
      />
      {child.length > 0 ? (
        <VCol variant="md" className="w-full border-l border-dashed">
          {child.map((field) => (
            <FormRenderer
              key={field.id}
              field={field}
              path={childPath}
              onAddField={onAddField}
              onFieldUpdate={onFieldUpdate}
              onRemoveField={onRemoveField}
            />
          ))}
        </VCol>
      ) : null}
      <AddButtons onAddField={onAddField} path={childPath} nested />
    </VCol>
  );
};

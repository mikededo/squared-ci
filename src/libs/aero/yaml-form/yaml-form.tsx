import { ChevronDownIcon, XIcon } from '@primer/octicons-react';
import { atom, useAtom } from 'jotai';
import React, { useMemo, useRef } from 'react';
import { twMerge } from 'tailwind-merge';

import { IconButton, Input, Row, VCol } from '@/aero';
import type { YamlField } from '@/aero';

import { AddButtons } from './add-buttons';
import type { UseFieldsResult } from './use-fields';

type Props = {
  field: YamlField;
  path?: string[];
  arrayChild?: boolean;
  onAddField: UseFieldsResult['onAddField'];
  onFieldUpdate: UseFieldsResult['onFieldUpdate'];
  onRemoveField: UseFieldsResult['onRemoveField'];
};

const StringPlaceholder: Record<Exclude<YamlField['as'], undefined>, string> = {
  number: 'Number value',
  boolean: 'Boolean value',
  string: 'String value',
};

export const YamlForm: React.FC<Props> = ({
  arrayChild,
  field,
  path = [],
  onAddField,
  onFieldUpdate,
  onRemoveField,
}) => {
  const [collapsed, setCollapsed] = useAtom(useMemo(() => atom(false), []));
  const childRef = useRef<HTMLDivElement>(null);

  const depth = path.length;

  const { type } = field;

  if (type === 'string') {
    const { child, value, as } = field;
    const placeholder = StringPlaceholder[as ?? 'string'];

    return (
      <Row
        align="start"
        className={twMerge(
          'w-full',
          depth === 0 && 'mb-2',
          depth > 0 && 'pl-4',
        )}
      >
        <Input
          variant="plain"
          placeholder={!arrayChild ? 'String key' : placeholder}
          defaultValue={value}
          onBlur={onFieldUpdate(field.id, path)}
          icon={<XIcon className="text-muted-foreground" />}
          onIconClick={onRemoveField(field.id, path)}
          type={as === 'number' && arrayChild ? 'number' : 'string'}
        />
        {child !== undefined && !arrayChild ? (
          <>
            <span className="pt-1">:</span>
            <Input
              variant="plain"
              placeholder={placeholder}
              defaultValue={child}
              onBlur={onFieldUpdate(field.id, path, true)}
              type={as === 'number' ? 'number' : 'string'}
              multiline={as === 'string'}
            />
          </>
        ) : null}
      </Row>
    );
  }

  const onToggleCollapse = () => {
    setCollapsed((prev) => !prev);
  };

  const { child, value } = field;
  const childPath = [...path, field.id];
  const objectPlaceholder = arrayChild
    ? 'Object is just decorative'
    : 'Object key';

  return (
    <VCol variant="none" className={twMerge('w-full', depth > 0 && 'pl-2')}>
      <Row align="center" className="w-full mb-2">
        <IconButton
          variant="plain"
          className="h-6 w-6"
          disabled={child.length === 0}
          onClick={onToggleCollapse}
        >
          <ChevronDownIcon
            className={twMerge(
              'transition-all',
              !collapsed && 'mt-0.5',
              collapsed && '-rotate-90 ml-0.5',
            )}
          />
        </IconButton>
        <Input
          variant="plain"
          defaultValue={value}
          placeholder={type === 'array' ? 'Array key' : objectPlaceholder}
          onBlur={onFieldUpdate(field.id, path)}
          icon={<XIcon className="text-muted-foreground" />}
          onIconClick={onRemoveField(field.id, path)}
          disabled={arrayChild && type === 'object'}
        />
      </Row>
      <VCol
        variant="md"
        className={twMerge(
          'w-full transition-all overflow-hidden max-h-[999px] ease-in-out duration-250',
          collapsed && 'max-h-0',
        )}
      >
        {child.length > 0 ? (
          <div className="w-full pl-7">
            <VCol
              ref={childRef}
              variant="md"
              className="w-full border-l border-dashed"
            >
              {child.map((field) => (
                <YamlForm
                  key={field.id}
                  field={field}
                  path={childPath}
                  arrayChild={type === 'array'}
                  onAddField={onAddField}
                  onFieldUpdate={onFieldUpdate}
                  onRemoveField={onRemoveField}
                />
              ))}
            </VCol>
          </div>
        ) : null}
        <AddButtons onAddField={onAddField} path={childPath} nested />
      </VCol>
    </VCol>
  );
};

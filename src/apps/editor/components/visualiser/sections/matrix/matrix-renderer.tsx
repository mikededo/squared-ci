import React from 'react';

import { Keyword, List, Tabbed } from '@/aero';
import type { Field, FieldAs } from '@/editor/domain/matrix';

type Props = {
  /**
   * If the field is inside of an array, it will append the
   * bullet point to the value.
   * It will also be used to ignored the group property of an
   * object field.
   */
  arrayChild?: boolean;
  /**
   * The depth of the rendering in the matrix.
   */
  depth?: number;
  /**
   * If the object is inside of an array, the key of the object should
   * not be rendered, and the first property of the object should contain
   * the bullet point.
   * Therefore, from a {@link Field} object, whose parent is an array,
   * the value property will not be rendered.
   *
   * @example
   * ```yaml
   * # Correct list with nested object yaml
   * list_key:
   *  - object_first_key: object_first_value
   *    object_second_key: object_second_value
   *    # ...
   * ```
   */
  firstObjectProp?: boolean;
  /**
   * The field to render.
   */
  field: Field;
};

const StringColor: Record<FieldAs, string> = {
  number: 'text-amber-600 dark:text-amber-400',
  boolean: 'text-purple-600 dark:text-purple-400',
  string: 'text-emerald-600 dark:text-green-400',
};

type StringRendererProps = Pick<Field, 'value' | 'as'> &
  Required<Pick<Props, 'depth'>> &
  Pick<Props, 'arrayChild'> & { child?: string };

const StringRenderer: React.FC<StringRendererProps> = ({
  depth,
  value,
  as,
  child,
  arrayChild,
}) => {
  const color = StringColor[as ?? 'string'];

  return (
    <Tabbed tabs={depth * 2}>
      {child ? (
        <Keyword>{value}: </Keyword>
      ) : (
        <span>
          {arrayChild ? '- ' : ''}
          <span className={color}>{value}</span>
        </span>
      )}
      {child ? (
        <span>
          {arrayChild ? '- ' : ''}
          <span className={color}>{child}</span>
        </span>
      ) : null}
    </Tabbed>
  );
};

export const MatrixRenderer: React.FC<Props> = ({
  arrayChild,
  field,
  depth = 1,
}) => {
  const { type, child, value, as } = field;
  if (type === 'string') {
    return (
      <StringRenderer
        as={as ?? 'string'}
        child={child}
        value={value}
        depth={depth}
        arrayChild={arrayChild}
      />
    );
  }

  const group = arrayChild ? `- ${value}` : value;
  const objectGroup = arrayChild ? undefined : group;

  return (
    <List
      group={type === 'object' ? objectGroup : group}
      items={child.map((field) => (
        <MatrixRenderer
          key={field.id}
          field={field}
          depth={depth + 1}
          arrayChild={type === 'array'}
        />
      ))}
      tabFactor={depth}
      asBulletList
    />
  );
};

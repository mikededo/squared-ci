import React from 'react';

import {
  AddButtons,
  Grid,
  Meta,
  VCol,
  YamlForm,
  YamlVisualiser,
  useFields,
} from '@/aero';

import { ItemHeader } from './item-header';
import { BorderedBox } from '../bordered-box';

const Content: React.FC<React.PropsWithChildren> = ({ children }) => (
  <Grid item container columns={12} size={12}>
    <BorderedBox className="hidden sm:block" sm={1} md={2} right bottom />
    <BorderedBox columns={12} sm={10} md={8} bottom>
      {children}
    </BorderedBox>
    <BorderedBox className="hidden sm:block" sm={1} md={2} left bottom />
  </Grid>
);

export const YamlEditor: React.FC = () => {
  const { fields, onAddField, onFieldUpdate, onRemoveField } = useFields();

  return (
    <>
      <ItemHeader title="Edit YAML with ease" />
      <Content>
        <VCol variant="md" className="p-4 max-h-60 overflow-auto">
          <p className="font-semibold">
            {fields.length ? 'Editor' : 'Start by adding a field!'}
          </p>
          {fields.map((field) => (
            <YamlForm
              key={field.id}
              field={field}
              onAddField={onAddField}
              onFieldUpdate={onFieldUpdate}
              onRemoveField={onRemoveField}
            />
          ))}
          <AddButtons path={[]} onAddField={onAddField} />
        </VCol>
      </Content>
      <Content>
        <VCol variant="md" className="p-4">
          <p className="text-sm">See the YAML parsed!</p>
          {fields.length ? (
            <div>
              <YamlVisualiser yaml={fields} tabs={0} />
            </div>
          ) : (
            <Meta>Add a field!</Meta>
          )}
        </VCol>
      </Content>
    </>
  );
};

export type FieldAs = 'string' | 'number' | 'boolean';
export type Field = { id: string; value: string } & (
  | { type: 'string'; child?: string; as?: FieldAs }
  | { type: 'array' | 'object'; child: Field[]; as?: never }
);

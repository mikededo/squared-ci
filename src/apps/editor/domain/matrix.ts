export type Field = { id: string; value: string } & (
  | { type: 'string'; child?: string; as: 'string' | 'number' | 'boolean' }
  | { type: 'array' | 'object'; child: Field[]; as?: never }
);

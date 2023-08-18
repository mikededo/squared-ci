export type Field = { id: string; value: string } & (
  | { type: 'string'; child?: string }
  | { type: 'array' | 'object'; child: Field[] }
);

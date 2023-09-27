export type YamlFieldAs = 'string' | 'number' | 'boolean';
export type YamlField = { id: string; value: string } & (
  | { type: 'string'; child?: string; as?: YamlFieldAs }
  | { type: 'array' | 'object'; child: YamlField[]; as?: never }
);

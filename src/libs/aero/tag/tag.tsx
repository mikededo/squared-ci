import React from 'react';

type Props = Omit<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >,
  'children' | 'className'
> & { text: string };

export const Tag: React.FC<Props> = ({ text, onClick, ...props }) => (
  <button
    className="bg-muted rounded text-xs font-mono px-2 py-1 cursor-pointer hover:bg-muted-hover transition-colors"
    onClick={onClick}
    {...props}
  >
    {text}
  </button>
);

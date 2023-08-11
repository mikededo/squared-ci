import React from 'react';

export const Input: React.FC<React.HTMLProps<HTMLInputElement>> = (props) => (
  <input
    {...props}
    className="font-mono text-sm px-2 py-1.5 rounded-md w-full border border-input bg-background outline-none transition-all focus:ring-offset-2 focus:ring-offset-background focus:ring-extra focus:ring-2 placeholder:text-muted-foreground"
  />
);

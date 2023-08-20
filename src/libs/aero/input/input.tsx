import React, { useRef } from 'react';
import { twMerge } from 'tailwind-merge';

type InputVariant = 'plain' | 'default';
type InnerProps = {
  variant?: InputVariant;
};
type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> &
  InnerProps & {
    multiline: true;
  };
type InputProps = React.InputHTMLAttributes<HTMLInputElement> &
  InnerProps & {
    multiline?: never;
  };
export type Props = TextAreaProps | InputProps;

const Variants: Record<InputVariant, string> = {
  default:
    'rounded-md border border-input bg-background outline-none focus:ring-offset-2 focus:ring-offset-background focus:ring-extra focus:ring-2',
  plain:
    'border-b-2 border-b-transparent focus:border-extra bg-muted outline-none focus:ring-0',
};

export const Input: React.FC<Props> = (props) => {
  const ref = useRef<HTMLTextAreaElement>(null);

  const { multiline, variant = 'default', className } = props;

  const handleOnInput: React.FormEventHandler<HTMLTextAreaElement> = (e) => {
    if (ref.current && multiline) {
      ref.current.style.height = 'auto';
      ref.current.style.height = `${ref.current.scrollHeight}px`;
      props?.onInput?.(e);
    }
  };

  const classes = twMerge(
    'font-mono text-sm px-2 py-1.5 w-full transition-all placeholder:text-muted-foreground',
    Variants[variant],
    className,
  );

  return multiline ? (
    <textarea
      {...props}
      rows={1}
      ref={ref}
      className={twMerge(classes, 'resize-none overflow-hidden')}
      onInput={handleOnInput}
    />
  ) : (
    <input {...props} className={classes} />
  );
};

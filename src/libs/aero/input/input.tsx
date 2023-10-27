import React, { useLayoutEffect, useRef } from 'react';
import { twMerge } from 'tailwind-merge';

import type { RequiredChildrenFC } from '@/pulse';

import { Row } from '../row';

type InputVariant = 'plain' | 'default';
type InnerProps = {
  variant?: InputVariant;
  icon?: React.ReactNode;
  onIconClick?: React.MouseEventHandler<HTMLButtonElement>;
};
type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> &
  InnerProps & {
    multiline: true;
  };
type InputProps = React.InputHTMLAttributes<HTMLInputElement> &
  InnerProps & {
    multiline?: false;
  };
export type Props = TextAreaProps | InputProps;

const Variants: Record<InputVariant, string> = {
  default:
    'rounded-md border border-input bg-background outline-none focus:ring-offset-2 focus:ring-offset-background focus:ring-extra focus:ring-2',
  plain:
    'border-b-2 border-b-transparent focus:border-extra bg-muted outline-none focus:ring-0',
};

const Wrapper: RequiredChildrenFC<Pick<Props, 'icon'>> = ({
  icon,
  children,
}) =>
  icon ? (
    <Row className="w-full" variant="none" align="center">
      {children}
    </Row>
  ) : (
    <>{children}</>
  );

export const Input: React.FC<Props> = (props) => {
  const ref = useRef<HTMLTextAreaElement>(null);

  const {
    multiline,
    variant = 'default',
    className,
    icon,
    onIconClick,
  } = props;

  const syncHeight = () => {
    if (ref.current && multiline) {
      ref.current.style.height = 'auto';
      ref.current.style.height = `${ref.current.scrollHeight}px`;
    }
  };

  const handleOnInput: React.FormEventHandler<HTMLTextAreaElement> = (e) => {
    if (multiline) {
      syncHeight();
      props?.onInput?.(e);
    }
  };

  useLayoutEffect(() => {
    syncHeight();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const classes = twMerge(
    'font-mono text-sm px-2 py-1.5 w-full transition-all placeholder:text-muted-foreground disabled:cursor-not-allowed',
    Variants[variant],
    className,
  );

  const iconButton = icon ? (
    <button
      className={twMerge(
        'flex items-center justify-center hover:bg-primary/10 transition-colors -ml-8 h-5 w-5 rounded-full cursor-pointer',
        multiline && 'self-start mt-2',
      )}
      onClick={onIconClick}
    >
      {icon}
    </button>
  ) : null;

  if (multiline) {
    const {
      multiline: _,
      icon: _icon,
      onIconClick: _onIconClick,
      ...rest
    } = props;

    return (
      <Wrapper icon={icon}>
        <textarea
          {...rest}
          rows={1}
          ref={ref}
          className={twMerge(classes, 'resize-none overflow-hidden')}
          onInput={handleOnInput}
        />
        {iconButton}
      </Wrapper>
    );
  }

  const {
    multiline: _,
    icon: _icon,
    onIconClick: _onIconClick,
    ...rest
  } = props;
  return (
    <Wrapper icon={icon}>
      <input {...rest} className={classes} />
      {iconButton}
    </Wrapper>
  );
};

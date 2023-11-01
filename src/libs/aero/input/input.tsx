import React, { useLayoutEffect, useRef } from 'react';
import { twMerge } from 'tailwind-merge';

import type { InputVariant, Props } from './types';
import { ErrorTextWrapper, IconWrapper } from './wrappers';

const Variants: Record<InputVariant, string> = {
  default:
    'rounded-sm border border-input bg-background outline-none focus:ring-offset-2 focus:ring-offset-background focus:ring-extra focus:ring-2',
  plain:
    'border-b-2 border-b-transparent focus:border-extra bg-muted outline-none focus:ring-0',
};
const ErrorVariants: Record<InputVariant, string> = {
  default: 'border-destructive focus:border-destructive',
  plain: 'border-b-destructive focus:border-b-destructive',
};

export const Input: React.FC<Props> = (props) => {
  const ref = useRef<HTMLTextAreaElement>(null);

  const {
    multiline,
    variant = 'default',
    className,
    icon,
    error,
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
  }, [props.value]);

  const classes = twMerge(
    'font-mono text-sm px-2 py-1.5 w-full transition-all placeholder:text-muted-foreground disabled:cursor-not-allowed',
    Variants[variant],
    error && ErrorVariants[variant],
    className,
  );

  const IconComponent = onIconClick ? 'button' : 'div';
  const iconButton = icon ? (
    <IconComponent
      className={twMerge(
        'flex items-center justify-center transition-colors -ml-8 h-5 w-5 rounded-full',
        multiline && 'self-start mt-2',
        onIconClick && 'hover:bg-muted-hover cursor-pointer',
      )}
      onClick={onIconClick as React.MouseEventHandler}
    >
      {icon}
    </IconComponent>
  ) : null;

  if (multiline) {
    const {
      multiline: _,
      icon: _icon,
      onIconClick: _onIconClick,
      ...rest
    } = props;

    return (
      <ErrorTextWrapper error={error}>
        <IconWrapper icon={icon}>
          <textarea
            {...rest}
            rows={1}
            ref={ref}
            className={twMerge(classes, 'resize-none overflow-hidden')}
            onInput={handleOnInput}
          />
          {iconButton}
        </IconWrapper>
      </ErrorTextWrapper>
    );
  }

  const {
    multiline: _,
    icon: _icon,
    onIconClick: _onIconClick,
    ...rest
  } = props;

  return (
    <ErrorTextWrapper error={error}>
      <IconWrapper icon={icon}>
        <input {...rest} className={classes} />
        {iconButton}
      </IconWrapper>
    </ErrorTextWrapper>
  );
};

export type InputVariant = 'plain' | 'default';
export type InnerProps = {
  variant?: InputVariant;
  icon?: React.ReactNode;
  error?: string;
  onIconClick?: React.MouseEventHandler<HTMLButtonElement>;
};
export type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> &
  InnerProps & {
    multiline: true;
  };
export type InputProps = React.InputHTMLAttributes<HTMLInputElement> &
  InnerProps & { multiline?: false };
export type Props = TextAreaProps | InputProps;

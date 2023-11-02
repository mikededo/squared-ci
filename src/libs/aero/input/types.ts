export type InputVariant = 'plain' | 'default';
export type InnerProps = {
  variant?: InputVariant;
  error?: string;
  // Variant with icon
  icon?: React.ReactNode;
  onIconClick?: React.MouseEventHandler<HTMLButtonElement>;
  // Variant with button
  /** Text to display to the button */
  button?: string;
  buttonDisabled?: boolean;
  onButtonClick?: () => void;
};
export type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> &
  InnerProps & {
    multiline: true;
  };
export type InputProps = React.InputHTMLAttributes<HTMLInputElement> &
  InnerProps & { multiline?: false };
export type Props = TextAreaProps | InputProps;

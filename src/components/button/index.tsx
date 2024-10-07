export interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  text?: string;
  isLoading?: boolean;
  isFocus?: boolean;
  iconStart?: React.ReactNode;
  iconEnd?: React.ReactNode;
  children?: React.ReactNode;
  disabled?: boolean;
}

function Button({ disabled = false, ...props }: IButton) {
  return (
    <button
      disabled={disabled}
      className={`relative text-center text-black ${props.className}`}
      {...props}>
      {props.iconStart} {props.text} {props.iconEnd}
      {props.children}
    </button>
  );
}

export default Button;

export interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  customClassName?: string;
  name: string;
  isLoading?: boolean;
  isFocus?: boolean;
  iconStart?: React.ReactNode;
  iconEnd?: React.ReactNode;
}

function ButtonRoot({ customClassName, name, isLoading, isFocus, iconStart, iconEnd, disabled, ...props }: IButton) {
  return (
    <button
      disabled={disabled}
      className={`rounded-lg bg-primary-pressed text-white ${customClassName}`}
      {...props}>
      {iconStart} {name} {iconEnd}
    </button>
  );
}

export default ButtonRoot;

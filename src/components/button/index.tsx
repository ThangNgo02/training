export interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  text: string;
  isLoading?: boolean;
  isFocus?: boolean;
  iconStart?: React.ReactNode;
  iconEnd?: React.ReactNode;
}

function Button(props: IButton) {
  return (
    <button
      disabled={props.disabled}
      className={`rounded-lg bg-primary-pressed text-center text-white ${props.className}`}
      {...props}>
      {props.iconStart} {props.text} {props.iconEnd}
    </button>
  );
}

export default Button;

import classNames from 'classnames';

export interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  name: string;
  isLoading?: boolean;
  isFocus?: boolean;
  iconStart?: React.ReactNode;
  iconEnd?: React.ReactNode;
}

function ButtonRoot({ className, name, isLoading, isFocus, iconStart, iconEnd, disabled, ...props }: IButton) {
  const buttonClassNames = classNames('rounded-lg bg-primary-pressed text-white', className);

  return (
    <button
      disabled={disabled}
      className={buttonClassNames}
      {...props}>
      {iconStart} {name} {iconEnd}
    </button>
  );
}

export default ButtonRoot;

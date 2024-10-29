interface IHeaderProps extends React.HTMLProps<HTMLDivElement> {
  iconStart?: React.ReactNode;
  iconEnd?: React.ReactNode;
  title?: string;
  className?: string;
}

export function Header({ className, title, iconStart, iconEnd, ...rest }: IHeaderProps) {
  return (
    <div
      className={`sticky right-0 top-0 flex items-center justify-between gap-[10px] border-y bg-white p-6 ${className} `}
      {...rest}>
      <div className='flex items-center gap-5'>
        {iconStart} {title}
      </div>
      {iconEnd}
    </div>
  );
}

interface IHeaderProps {
  iconStart?: React.ReactNode;
  iconEnd?: React.ReactNode;
  title?: string;
  className?: string;
}

export function Header(props: IHeaderProps) {
  return (
    <div
      className={`sticky right-0 top-0 flex items-center justify-between gap-[10px] border-y bg-white p-6 ${props.className} `}>
      <div className='flex items-center gap-3'>
        {props.iconStart} {props.title}
      </div>
      {props.iconEnd}
    </div>
  );
}

import IconRoot from '@/components/icon';
import { IconVariable } from '@/components/icon/types';
import { Localize, LocalizeTypeFunc } from '@/context/languages';

interface IInputRootProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
  classNameInput?: string;
  text?: string;
  isError?: boolean;
  disabled?: boolean;
  errorString?: string;
  readOnly?: boolean;
  iconEnd?: React.ReactNode;
  iconStart?: React.ReactNode;
}

function InputRoot({
  classNameInput,
  isError = false,
  errorString,
  readOnly = false,
  disabled = false,
  ...props
}: IInputRootProps) {
  return (
    <div className='flex flex-col gap-1'>
      {props.label && (
        <span className='text-16x20 font-medium text-[#1a1a1a]'>
          <Localize tid={props.label} />
        </span>
      )}
      <div
        className={`text-neutral-80 text-16x20 flex items-center gap-2 rounded-lg border p-3 transition ${props.className} ${isError ? 'border-[#EF1414]' : 'border-[#E0E0E0]'} ${
          disabled && 'bg-neutral-40 hover:bg-neutral-40 cursor-not-allowed border-none'
        }`}>
        {props.iconStart}
        <input
          placeholder={LocalizeTypeFunc(props.placeholder ?? '')}
          readOnly={readOnly}
          autoFocus={props.autoFocus}
          type={props.type}
          value={props.value}
          onChange={props.onChange}
          {...props}
          className={`h-full w-full bg-inherit outline-none ${
            disabled && 'bg-neutral-40 cursor-not-allowed'
          } ${classNameInput}`}
        />
        {props.iconEnd}
      </div>

      {isError && (
        <div className='bg-danger-bg_color flex items-center gap-1 p-1'>
          <IconRoot icon={IconVariable.error} />
          <span className='text-12x16 text-[#EF1414]'>
            <Localize tid={errorString ?? ''} />
          </span>
        </div>
      )}
    </div>
  );
}

export default InputRoot;

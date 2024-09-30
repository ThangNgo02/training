import React from 'react';
import { useFormContext } from 'react-hook-form';

import IconRoot from '@/components/icon';
import { IconVariable } from '@/components/icon/types';
import { Localize, LocalizeTypeFunc } from '@/context/languages';
import { Helper } from '@/utils/Helper';

export interface IInputRootProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
  text?: string;
  classNameInput?: string;
  name: string;
  isError?: boolean;
  isActive?: boolean | boolean[];
  disabled?: boolean;
  isErrorWrongLogin?: boolean;
  errorString?: string;
  readOnly: boolean;
  iconEnd?: React.ReactNode;
  iconStart?: React.ReactNode;
}
function InputRoot({
  type = 'text',
  isError = false,
  classNameInput,
  isActive,
  isErrorWrongLogin,
  errorString,
  readOnly,
  ...props
}: IInputRootProps) {
  const methods = useFormContext();
  const isErrorVariable =
    (!Helper.isEmpty(methods?.formState?.errors[props.name]) || isError || isErrorWrongLogin) ?? errorString;
  const [state, setState] = React.useState<string | number>(methods?.getValues()[props.name]);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setState(value);
    methods?.setValue(props.name, value);
  };

  return (
    <div className={` flex flex-col gap-2`}>
      {props.label && (
        <span className='text-16x20 font-medium text-[#1A1A1A]'>
          <Localize tid={props.label} />
        </span>
      )}
      <div
        className={`text-neutral-80 flex items-center gap-2 rounded-lg border p-3 text-16x20 transition ${props.className} ${isErrorVariable ? 'border-danger-main' : 'hover:border-primary-hover hover:bg-primary-bg_color focus:border-primary-hover active:border-primary-hover border-[#e5e7eb] '} ${
          props.disabled && 'bg-neutral-40 hover:bg-neutral-40 cursor-not-allowed  border-none'
        }`}>
        {props.iconStart}
        <input
          autoFocus={props.autoFocus}
          value={state}
          type={type}
          onChange={handleOnChange}
          {...props}
          className={`h-full w-full bg-inherit outline-none ${
            props.disabled && 'bg-neutral-40 cursor-not-allowed'
          } ${classNameInput}`}
          placeholder={LocalizeTypeFunc(props.placeholder ?? '')}
          readOnly={readOnly}
        />
        {props.iconEnd}
      </div>
      {!Helper.isEmpty(methods?.formState?.errors[props.name]) && (
        <div className='bg-danger-bg_color flex gap-1 p-1'>
          <IconRoot icon={IconVariable.error} />
          <span className='text-12x16 text-neutral-100'>
            <Localize tid={methods?.formState?.errors[props.name]?.message ?? ''} />
          </span>
        </div>
      )}
      {errorString && (
        <div className='bg-danger-bg_color flex gap-1 p-1'>
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

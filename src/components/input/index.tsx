import React from 'react';
import { useFormContext } from 'react-hook-form';

import { Localize, LocalizeTypeFunc } from '@/context/languages';
import { Helper } from '@/utils/Helper';

import IconRoot from '../icon';
import { IconVariable } from '../icon/types';
export interface IInputRootProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  iconEnd?: React.ReactNode;
  iconStart?: React.ReactNode;
  className?: string;
  text?: string;
  type?: string;
  classNameInput?: string;
  name: string;
  isError?: boolean;
  isActive?: boolean | boolean[];
  disabled?: boolean;
  isErrorWrongLogin?: boolean;
  errorString?: string;
}
function InputRoot({
  type = 'text',
  isError = false,
  classNameInput,
  isActive,
  isErrorWrongLogin,
  errorString,
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
        <span className='text-16x20 font-medium text-[##1A1A1A]'>
          <Localize tid={props.label} />
        </span>
      )}
      <div
        className={` text-16x20 text-neutral-80 flex h-11 items-center gap-2 rounded-lg border p-3 transition ${props.className} ${isError ? 'border-red-500' : 'border-neutral-40 hover:border-primary-hover hover:bg-primary-bg_color focus:border-primary-hover active:border-primary-hover '} ${
          props.disabled && 'bg-neutral-40  hover:bg-neutral-40  cursor-not-allowed  border-none'
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
          <span className='text-12x16 text-neutral-100'>
            <Localize tid={errorString ?? ''} />
          </span>
        </div>
      )}
    </div>
  );
}

export default InputRoot;

import React from 'react';
import { useForm, useFormContext, type UseFormRegister } from 'react-hook-form';

import { Localize, LocalizeTypeFunc } from '@/context/languages';
import { Helper } from '@/utils/Helper';

// import { type IICon } from '../button';
// import IconRoot from '../icon';
// import { IconVariable } from '../icon/types';
export interface IInputRootProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  // icon?: IICon;
  className?: string;
  text?: string;
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
  className,
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
  // const handleStartIcon = (icon?: IICon) => {
  //   if (icon && icon.direction === 'start') {
  //     return (
  //       <IconRoot
  //         onClick={icon.onClick}
  //         icon={icon.icon}
  //       />
  //     );
  //   }
  //   return <React.Fragment />;
  // };
  // const handleEndIcon = (icon?: IICon) => {
  //   if (icon && icon.direction === 'end') {
  //     return (
  //       <IconRoot
  //         onClick={icon.onClick}
  //         icon={icon.icon}
  //       />
  //     );
  //   }
  //   return <React.Fragment />;
  // };
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setState(value);
    methods?.setValue(props.name, value);
  };
  return (
    <div className={`flex flex-col gap-2`}>
      {props.label && (
        <span className='mt-3 text-base font-medium text-black'>
          <Localize tid={props.label} />
        </span>
      )}
      <div className={`rounded-lg border border-gray-300 ${type === 'submit' && ' bg-green-700 p-0'} ${className}`}>
        {/* {handleStartIcon(props.icon)} */}
        <input
          autoFocus={props.autoFocus}
          value={state}
          type={type}
          {...props}
          className={`h-full w-full bg-inherit p-3 outline-none  ${type === 'submit' && 'cursor-pointer rounded-lg p-3'} ${
            props.disabled && 'bg-neutral-40 cursor-not-allowed'
          } ${classNameInput}`}
          placeholder={LocalizeTypeFunc(props.placeholder ?? '')}
          {...methods.register(props.name)}
        />
        {/* {handleEndIcon(props.icon)} */}
      </div>
      {!Helper.isEmpty(methods?.formState?.errors[props.name]) && (
        <div className='bg-danger-bg_color flex gap-1 p-1'>
          {/* <IconRoot icon={IconVariable.error} /> */}
          <span className='text-12x16 text-neutral-100'>
            <Localize tid={methods?.formState?.errors[props.name]?.message ?? ''} />
          </span>
        </div>
      )}
      {errorString && (
        <div className='flex gap-1 p-1'>
          {/* <IconRoot icon={IconVariable.error} /> */}
          <span className='text-12x16 text-red-500'>
            <Localize tid={errorString ?? ''} />
          </span>
        </div>
      )}
    </div>
  );
}

export default InputRoot;

import React from 'react';

import Button from '@/components/button';
import FormRoot from '@/components/form';
import IconRoot from '@/components/icon';
import { IconVariable } from '@/components/icon/types';
import InputRoot from '@/components/input';
import { LocalizeTypeFunc } from "@/context/languages";

interface IRegister {
  isLoading?: boolean;
  handleCallApi?: (data: any) => void;
}

function RegisterView({ isLoading, handleCallApi }: IRegister) {
  const [isHidden, setHidden] = React.useState(false);

  const handleHiddenPassword = () => {
    setHidden(!isHidden);
  };

  const onSubmit = (data: any) => {
    handleCallApi && handleCallApi(data);
  };

  return (
    <FormRoot onSubmit={onSubmit}>
      <div className='flex flex-col gap-8 text-16x20'>
        <InputRoot
          label={LocalizeTypeFunc('fullName')}
          name='fullName'
          readOnly={false}
          placeholder={LocalizeTypeFunc('enter.fullName')}
        />
        <InputRoot
          label={LocalizeTypeFunc('username')}
          name='username'
          readOnly={false}
          placeholder={LocalizeTypeFunc('enter.username')}
        />
        <InputRoot
          className='relative'
          type={isHidden ? 'password' : 'text'}
          label={LocalizeTypeFunc('password')}
          name='password'
          readOnly={false}
          placeholder={LocalizeTypeFunc('enter.password')}
          iconEnd={
            isHidden ? (
              <IconRoot
                onClick={handleHiddenPassword}
                icon={IconVariable.closeEyes}
              />
            ) : (
              <IconRoot
                className='h-4 w-4'
                onClick={handleHiddenPassword}
                icon={IconVariable.openEyes}
              />
            )
          }
        />
        <Button
          name={LocalizeTypeFunc('register')}
          className='rounded-lg bg-primary-pressed px-6 py-4 text-white'
          type='submit'
        />
      </div>
    </FormRoot>
  );
}

export default RegisterView;

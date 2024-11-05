import React from 'react';
import { Link } from 'react-router-dom';

import Button from '@/components/button';
import FormRoot from '@/components/form';
import IconRoot from '@/components/icon';
import { IconVariable } from '@/components/icon/types';
import InputRoot from '@/components/input';
import { LocalizeTypeFunc } from "@/context/languages";

interface ILogin {
  isLoading?: boolean;
  handleCallApi?: (data: any) => any;
}

function LoginView({ isLoading, handleCallApi }: ILogin) {
  const [isHidden, setHidden] = React.useState(true);

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
          readOnly={false}
          label={LocalizeTypeFunc('username')}
          name='username'
          placeholder={LocalizeTypeFunc('enter.username')}
        />
        <div className='flex flex-col gap-3'>
          <div className=''>
            <InputRoot
              readOnly={false}
              className='relative'
              type={isHidden ? 'password' : 'text'}
              label={LocalizeTypeFunc('password')}
              name='password'
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
          </div>
          <div className='flex justify-end'>
            <Link
              to={'/forgot-password'}
              className='font-medium text-primary-pressed'>
              {LocalizeTypeFunc('forgotPassword')}?
            </Link>
          </div>
        </div>
        <Button
          name={LocalizeTypeFunc('login')}
          customClassName='rounded-lg bg-primary-pressed px-6 py-4 text-white'
          type='submit'
        />
      </div>
    </FormRoot>
  );
}

export default LoginView;

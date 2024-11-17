import { Button } from 'antd';
import React, { useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import * as yup from 'yup';

import Form, { type IFormRef } from '@/components/form';
import IconRoot from '@/components/icon';
import { IconVariable } from '@/components/icon/types';
import InputRoot from '@/components/input';
import { Localize } from '@/context/languages';

interface ILoginViewProps {
  handleSubmit: (data: any) => void;
  error: string;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const LoginView: React.FC<ILoginViewProps> = ({ handleSubmit, error }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const methods = useFormContext();
  const formRef = useRef<IFormRef>(null);

  const defaultFormValues = {
    username: '',
    password: '',
  };

  const validationSchema = {
    username: yup.string().required('Tên đăng nhập không được để trống'),
    password: yup.string().required('Mật khẩu không được để trống').min(6, 'Mật khẩu phải tối thiểu 6 ký tự'),
  };

  const handleFormSubmit = (values: any) => {
    handleSubmit(values);
    formRef.current?.reset(defaultFormValues);
  };
  const handlePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <Form
      ref={formRef}
      onSubmit={handleFormSubmit}
      validator={validationSchema}
      defaultValues={defaultFormValues}>
      <div className='min-h-[650px] w-full max-w-[600px] rounded-lg bg-white p-8 shadow-md'>
        <div className='ml-6 mr-6 flex w-[400px] justify-around gap-1'>
          <select className='rounded-md  border-none bg-white px-2 py-1'>
            <option
              value='vietnam'
              className='border-none'>
              Tieng Viet
            </option>
            <option
              value='english'
              className='border-none'>
              english
            </option>
          </select>
          <div>
            <Localize tid={'Contact'} />
          </div>
          <div>
            <Localize tid={'Register'} />
          </div>
        </div>

        <div className='mt-8 flex items-center justify-center'>
          <img
            src='/Hr-icon.png'
            alt='Hr Icon'
          />
        </div>

        <h1 className='mb-6 text-center text-2xl font-bold text-gray-800'>Đăng nhập TSP</h1>

        {error && (
          <div className='mb-4 flex w-full flex-row items-center justify-center bg-[#FFF6F6] text-sm text-red-500'>
            <IconRoot
              icon={IconVariable.alert}
              className='items-center justify-center'
            />
            {error}
          </div>
        )}

        <div className='mb-4 w-full'>
          <label
            htmlFor='username'
            className='mb-2 block text-sm font-bold text-gray-700'>
            <Localize tid={'Username'} />
          </label>
          <InputRoot
            type='text'
            id='username'
            name='username'
            placeholder='Điền tên đăng nhập'
            // eslint-disable-next-line @typescript-eslint/no-base-to-string
            errorString={methods?.formState?.errors?.username ? methods?.formState?.errors?.username?.toString() : ''}
            className={`w-full rounded-md border px-3 py-2 focus:outline-none`}
          />
        </div>

        <div className='mb-6'>
          <label
            htmlFor='password'
            className='mb-2 block text-sm font-bold text-gray-700'>
            <Localize tid={'Password'} />
          </label>

          <div className='relative'>
            <InputRoot
              type={isPasswordVisible ? 'text' : 'password'}
              id='password'
              placeholder='Điền mật khẩu'
              // eslint-disable-next-line @typescript-eslint/no-base-to-string
              errorString={methods?.formState?.errors?.password ? methods?.formState?.errors?.password?.toString() : ''}
              name='password'
              iconEnd={
                isPasswordVisible ? (
                  <IconRoot
                    icon={IconVariable.openEyes}
                    onClick={handlePasswordVisibility}
                    className='hover:cursor-pointer'
                  />
                ) : (
                  <IconRoot
                    icon={IconVariable.closeEyes}
                    onClick={handlePasswordVisibility}
                    className='hover:cursor-pointer'
                  />
                )
              }
            />
          </div>
        </div>

        <div className='mb-8 flex justify-between'>
          <a
            href='#'
            className='cursor-pointer  font-semibold text-[#2DB976]'>
            <Localize tid={'Register'} />
          </a>

          <a
            href='#'
            className='cursor-pointer  font-semibold text-[#2DB976]'>
            <Localize tid={'Forget password'} />
          </a>
        </div>

        <div className='flex items-center justify-between'>
          <Button
            htmlType='submit'
            className='w-full rounded bg-[#2DB976] px-4 py-2 font-semibold text-white  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:opacity-50'>
            Đăng nhập
          </Button>
        </div>
      </div>
    </Form>
  );
};

export default LoginView;

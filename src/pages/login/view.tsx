import { useForm } from 'react-hook-form';

import ButtonRoot from '@/components/atoms/buttonRoot';
import InputRoot from '@/components/atoms/inputRoot';
import { Localize } from '@/context/languages';

interface ILoginProps {
  isError: any;
  handleLogin: (event: any) => any;
}

function LoginView({ isError, handleLogin }: ILoginProps) {
  const form = useForm();
  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form onSubmit={form.handleSubmit(handleLogin)}>
      <img
        src='src/assets/images/hr-logo.svg'
        className='mb-3 flex h-16 w-full justify-center'
      />
      <span className='mb-10 flex w-full justify-center text-4xl font-bold'>{Localize({ tid: 'login.to' })} TSP</span>
      <InputRoot
        label='username'
        isError={isError}
        className='mb-8 h-login w-login self-center'
        name='username'
        register={form.register}
      />
      <InputRoot
        label='password'
        type='password'
        isError={isError}
        className='mb-3 h-login w-login self-center'
        name='password'
        register={form.register}
      />
      <span className='mb-8 flex w-full justify-end text-base font-medium text-primary'>
        {Localize({ tid: 'forgetPassword' })}
      </span>
      <ButtonRoot
        label={Localize({ tid: 'login' })}
        className='w-full bg-primary px-8 py-4 text-lg'
      />
    </form>
  );
}

export default LoginView;

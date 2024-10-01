import ButtonRoot from '@/components/atoms/buttonRoot';
import FormRoot from '@/components/atoms/formRoot';
import InputRoot from '@/components/atoms/inputRoot';
import { Localize } from '@/context/languages';

interface ILoginProps {
  handleLogin: (event: any) => any;
}

function LoginView({ handleLogin }: ILoginProps) {
  return (
    <FormRoot onSubmit={handleLogin}>
      <img
        src='src/assets/images/hr-logo.svg'
        className='mb-3 flex h-16 w-full justify-center'
      />
      <span className='mb-10 flex w-full justify-center text-4xl font-bold'>{Localize({ tid: 'login.to' })} TSP</span>
      <InputRoot
        label='username'
        className='mb-8 h-login w-login self-center'
        name='username'
      />
      <InputRoot
        label='password'
        type='password'
        className='mb-3 h-login w-login self-center'
        name='password'
      />
      <span className='mb-8 flex w-full justify-end text-base font-medium text-primary'>
        {Localize({ tid: 'forgetPassword' })}
      </span>
      <ButtonRoot
        label={Localize({ tid: 'login' })}
        className='w-full bg-primary px-8 py-4 text-lg'
      />
    </FormRoot>
  );
}

export default LoginView;

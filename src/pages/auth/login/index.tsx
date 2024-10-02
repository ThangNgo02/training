import IconRoot from '@/components/icon';
import { IconVariable } from '@/components/icon/types';

import LoginView from './view';

export interface IFormField {
  username: string;
  password: string;
}

function Login() {
  const handleSubmitLogin = (data: any) => {
    console.log(data);
  };
  return (
    <>
      {false && (
        <div className='mt-2 flex items-center justify-center gap-2'>
          <IconRoot icon={IconVariable.error} />
          <span className='text-sm font-medium text-[#C60808]'>Tên đăng nhập hoặc mật khẩu của bạn không đúng.</span>
        </div>
      )}
      <LoginView handleSubmit={handleSubmitLogin} />
    </>
  );
}

export default Login;

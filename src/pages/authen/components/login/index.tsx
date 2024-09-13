import { Link } from 'react-router-dom';

import Button from '@/components/button';
import InputRoot from '@/components/input';

interface ILogin {
  handleCallApi?: () => void;
}

function Login({ handleCallApi }: ILogin) {
  return (
    <div className='text-16x20 flex flex-col gap-8'>
      <InputRoot
        label='Tên đăng nhập'
        name='username'
        readOnly={false}
        placeholder='Nhập tên đăng nhập'
      />
      <div className='flex flex-col gap-3'>
        <InputRoot
          label='Mật khẩu'
          name='password'
          readOnly={false}
          placeholder='Nhập mật khẩu'
        />
        <div className='flex justify-end'>
          <Link
            to={'/'}
            className='font-medium text-primary-pressed'>
            Quên mật khẩu?
          </Link>
        </div>
      </div>
      <Button
        name='Đăng nhập'
        className='rounded-lg bg-primary-pressed px-6 py-4 text-white'
        onClick={handleCallApi}
      />
    </div>
  );
}

export default Login;

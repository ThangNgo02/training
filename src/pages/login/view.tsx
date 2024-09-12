import { Link } from 'react-router-dom';

import Button from '@/components/button';
import Heading from '@/components/heading';
import IconRoot from '@/components/icon';
import { IconVariable } from '@/components/icon/types';
import InputRoot from '@/components/input';

interface ILoginView {
  isLoading: boolean;
  handleCallApi: () => void;
  data: any;
}

function LoginView({ isLoading, handleCallApi, data }: ILoginView) {
  return (
    <>
      <div className="h-screen bg-[url('public/theme-login.png')] bg-cover bg-center">
        <div className='flex h-screen items-center justify-center'>
          <div className='w-[500px] rounded-[20px] bg-white p-10'>
            <div className='flex items-center justify-center px-[13px] font-medium'>
              <div className='px-6 py-[10px]'>
                <Button
                  className='flex items-center gap-[6px]'
                  name='Tiếng việt'
                  iconEnd={<IconRoot icon={IconVariable.arrowDown} />}
                />
              </div>
              <div className='px-6 py-[10px]'>
                <Link to='/contact'>Liên hệ</Link>
              </div>
              <div className='px-6 py-[10px]'>
                <Link to='/register'>Đăng ký</Link>
              </div>
            </div>
            <div className='mt-[72px] flex items-center justify-center'>
              <img
                src='/public/logo.png'
                alt='logo'
              />
            </div>
            <Heading
              children='Đăng nhập TSP'
              className='mb-10 mt-3 h-11 text-center text-[36px] font-bold'
            />
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
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginView;

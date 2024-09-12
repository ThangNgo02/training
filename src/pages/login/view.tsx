import { Link } from 'react-router-dom';

import Button from '@/components/button';
import IconRoot from '@/components/icon';
import { IconVariable } from '@/components/icon/types';

interface ILoginView {
  isLoading: boolean;
  handleCallApi: () => void;
  data: any;
}

function LoginView({ isLoading, handleCallApi, data }: ILoginView) {
  return (
    <>
      <div className="h-screen bg-[url('public/background.png')] bg-cover bg-center">
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
            <h3>Đăng nhập TSP</h3>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginView;

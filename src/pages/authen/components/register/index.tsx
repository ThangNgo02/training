import Button from '@/components/button';
import InputRoot from '@/components/input';

interface IRegister {
  handleCallApi?: () => void;
}

function Register({ handleCallApi }: IRegister) {
  return (
    <div className='text-16x20 flex flex-col gap-8'>
      <InputRoot
        label='Họ và tên'
        name='fullName'
        readOnly={false}
        placeholder='Nhập họ và tên'
      />
      <InputRoot
        label='Tên đăng nhập'
        name='username'
        readOnly={false}
        placeholder='Nhập tên đăng nhập'
      />
      <InputRoot
        label='Mật khẩu'
        name='password'
        readOnly={false}
        placeholder='Nhập mật khẩu'
      />
      <Button
        name='Đăng kí'
        className='rounded-lg bg-primary-pressed px-6 py-4 text-white'
        onClick={handleCallApi}
      />
    </div>
  );
}

export default Register;

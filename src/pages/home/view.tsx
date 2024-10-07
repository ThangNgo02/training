import { Button } from 'antd';
import { useState } from 'react';

import Form from '@/components/form';
import IconRoot from '@/components/icon';
import { IconVariable } from '@/components/icon/types';
import InputRoot from '@/components/input';
import Modal from '@/components/modal';
import TextButton from '@/components/textbutton';

interface IHomeView {
  isLoading: boolean;
  handleCallApi: () => void;
  data: any;
}

function HomeView({ isLoading, handleCallApi, data }: IHomeView) {
  const [isOpen, setIsOpen] = useState(false);
  const handleConfirm = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <Modal
        isOpenModal={isOpen}
        setIsOpenModal={setIsOpen}
        title='Thông báo'
        content='Token đã hết hạn. Vui lòng đăng nhập lại'
        onConfirm={handleConfirm}
        icon={<IconRoot icon={IconVariable.warningModal} />}
      />
      <TextButton
        onClick={() => {
          setIsOpen(true);
        }}
        text='Quên mật khẩu ?'
        iconEnd={<IconRoot icon={IconVariable.closeEyes} />}
      />
      <div className='home-text_900 text-red-900'>Well come to our company</div>
      <button onClick={handleCallApi}>Click here to example call api</button>
      {isLoading ? <div>Loading</div> : <div>{JSON.stringify(data)}</div>}
      <div>
        AntD <br />
        <Button type='primary'>Button</Button>
      </div>

      <Form
        onSubmit={data => {
          console.log(data);
        }}>
        <InputRoot
          name='username'
          label='username'
        />
        <InputRoot
          name='password'
          label='password'
        />
        <button type='submit'>Submit test</button>
      </Form>
    </div>
  );
}

export default HomeView;

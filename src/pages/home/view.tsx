import { Button } from 'antd';
import { useState } from 'react';

import IconRoot from '@/components/icon';
import { IconVariable } from '@/components/icon/types';
import InputRoot from '@/components/input';
import SelectRoot, { type IOption } from '@/components/select';
import TextButton from '@/components/textbutton';

interface IHomeView {
  isLoading: boolean;
  handleCallApi: () => void;
  data: any;
}

function HomeView({ isLoading, handleCallApi, data }: IHomeView) {
  const options: IOption[] = [
    { value: 'VN', label: 'Tiếng Việt' },
    { value: 'ENG', label: 'Tiếng Anh' },
  ];
  const [selectedValue, setSelectedValue] = useState<string | undefined>();

  const handleOnChangeSelect = (value: string) => {
    setSelectedValue(value);
  };

  const [inputValue, setInputValue] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div>
      <InputRoot
        label='Tên đăng nhập: '
        value={inputValue}
        onChange={handleInputChange}
        placeholder='Nhập tên đăng nhập'
      />
      <TextButton
        text='Quên mật khẩu ?'
        iconEnd={<IconRoot icon={IconVariable.closeEyes} />}
      />
      <SelectRoot
        value={selectedValue}
        placeholder='Ngôn ngữ'
        options={options}
        onChange={handleOnChangeSelect}
      />
      <div className='home-text_900 text-red-900'>Well come to our company</div>
      <button onClick={handleCallApi}>Click here to example call api</button>
      {isLoading ? <div>Loading</div> : <div>{JSON.stringify(data)}</div>}
      <div>
        AntD <br />
        <Button type='primary'>Button</Button>
      </div>
    </div>
  );
}

export default HomeView;

import Button from '../button';
import Form from '../form';
import InputRoot from '../input';
import SelectRoot, { type IOption } from '../select';

interface IModalFilterProps {
  setIsOpenModalFilter: (value: boolean) => void;
}
export function ModalFilter(props: IModalFilterProps) {
  const handleChangeStatus = (value: IOption) => {
    console.log(value);
  };
  const handleChangeDepartment = (value: IOption) => {
    console.log(value);
  };

  return (
    <div
      className='relative'
      onClick={e => {
        e.stopPropagation();
      }}>
      <div className='custom-shadow absolute right-[-16px] top-10 z-50 w-[600px] rounded-lg bg-white'>
        <div className='absolute right-8 top-[-12px] h-0 w-0'>
          <div className='h-0 w-0 border-b-[10px] border-l-[8px] border-r-[8px] border-b-green-300 border-l-transparent border-r-transparent shadow-lg'></div>
        </div>
        <Form>
          <div className='flex gap-5 p-4'>
            <div className='w-[50%]'>
              <InputRoot
                name='position'
                placeholder='Chức vụ'
                label='Chức vụ'
                classNameLabel='text-start font-normal text-[15px] ml-1'
              />
              <InputRoot
                name='mst'
                placeholder='Mã số thuế'
                label='MST'
                classNameLabel='text-start font-normal text-[15px] ml-1 mt-4'
              />
              <div className='mt-4'>
                <p className='ml-1 text-start text-[15px] font-normal'>Trạng thái</p>
                <SelectRoot
                  firstValue={{ label: 'Trạng thái', value: '' }}
                  options={[
                    { label: 'Hoạt động', value: 'Hoạt động' },
                    { label: 'Khóa', value: 'Khóa' },
                  ]}
                  onChange={handleChangeStatus}
                  className='mt-2 rounded-lg border p-[10px]'
                />
              </div>
            </div>
            <div className='w-[50%]'>
              <InputRoot
                name='bhxh'
                placeholder='BHXH'
                label='BHXH'
                classNameLabel='text-start font-normal text-[15px] ml-1'
              />
              <div className='mt-4'>
                <p className='ml-1 text-start text-[15px] font-normal'>Phòng ban</p>
                <SelectRoot
                  firstValue={{ label: 'Phòng ban', value: '' }}
                  options={[
                    { label: 'Phòng ban 1', value: 'Phòng ban 1' },
                    { label: 'Phòng ban 2', value: 'Phòng ban 2' },
                    { label: 'Phòng ban 3', value: 'Phòng ban 3' },
                    { label: 'Phòng ban 4', value: 'Phòng ban 4' },
                  ]}
                  onChange={handleChangeDepartment}
                  className='mt-2 rounded-lg border p-[10px]'
                />
              </div>
            </div>
          </div>
          <div className='my-5 flex items-center justify-end gap-5 px-5'>
            <Button
              text='Đặt lại'
              className='rounded-md border border-[#818da0] px-4 py-1 text-[#818da0] hover:cursor-pointer hover:border-[#2db976] hover:text-[#2db976]'
            />
            <Button
              text='Áp dụng'
              className='rounded-md border border-[#2db976] bg-[#2db976] px-4 py-1 text-[#fff] hover:cursor-pointer hover:border-[#2db976] hover:opacity-85'
            />
          </div>
        </Form>
      </div>
    </div>
  );
}

import type { DatePickerProps, UploadFile, UploadProps } from 'antd';
import { DatePicker, Upload } from 'antd';
import { useState } from 'react';

import Button from '@/components/button';
import { Checkbox } from '@/components/checkbox';
import IconRoot from '@/components/icon';
import { IconVariable } from '@/components/icon/types';
import InputRoot from '@/components/input';
import SelectRoot, { type IOption } from '@/components/select';
import TextAreaRoot from '@/components/textarea';

export function ModalAddEmployeeView() {
  const handleChangeDepartment = (value: IOption) => {};
  const handleChangeGender = (value: IOption) => {};
  const onChangeBirthday: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  };
  const [isQuitJob, setIsQuitJob] = useState<boolean>(false);

  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const props: UploadProps = {
    onRemove: file => {
      const index = fileList.indexOf(file);
      const newFileList = [...fileList];
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: file => {
      setFileList([...fileList, file]);

      return false;
    },
    fileList,
  };
  return (
    <div className='fixed bottom-0 left-0 right-0 top-0 bg-black p-1'>
      <div className='relative m-5 max-h-[95vh] overflow-y-auto rounded-xl bg-white'>
        <div className='sticky top-0 z-50 flex items-center justify-between border-b-[1px] border-[#E4E7EC] bg-white px-6  py-6'>
          <span className='text-[18px] font-semibold text-[#344054]'>Thêm hồ sơ nhân viên</span>
          <div className='flex items-center gap-4'>
            <Button
              text='Đóng'
              className='w-[90px] rounded-lg border border-[#98A2B3] px-4 py-2 text-center text-sm font-medium text-[#344054] hover:cursor-pointer hover:border-[#2DB976] hover:text-[#2DB976]'
            />
            <Button
              text='Lưu'
              className='w-[90px] rounded-lg border border-[#2DB976] bg-[#2DB976] px-4 py-2 text-center text-sm font-medium text-[#fafafa] hover:cursor-pointer hover:bg-[#2db975d7] hover:text-white'
            />
          </div>
        </div>
        <div className='p-5'>
          <div className='border-b-2 border-b-[#E4E7EC] pb-6'>
            <span className='text-base font-semibold text-[#344054]'>Thông tin chi tiết</span>
            <div className='mt-4 flex gap-6'>
              <div className='w-[50%] gap-4 rounded-[10px] bg-[#E0F9EA] p-4'>
                <div className='box-border flex justify-between gap-4'>
                  <div className='w-[50%]'>
                    <InputRoot
                      name='employeeName'
                      className='bg-white'
                      label='Tên nhân viên'
                      placeholder='Tên nhân viên'
                      classNameLabel='text-[#344054] text-sm font-normal'
                    />
                  </div>
                  <div className='w-[50%]'>
                    <p className='text-sm font-normal text-[#344054]'>Phòng ban</p>
                    <SelectRoot
                      className='mt-2 flex justify-between rounded-lg border bg-white p-[11px]'
                      classNameOptionList='top-8'
                      options={[
                        { label: 'IT', value: 'IT' },
                        { label: 'Nhân sự', value: 'Nhân sự' },
                      ]}
                      firstValue={{ label: 'Phòng ban', value: '' }}
                      name='deparmentCode'
                    />
                  </div>
                </div>
                <div className='mt-4 box-border flex justify-between gap-4'>
                  <InputRoot
                    name='position'
                    className='bg-white'
                    label='Chức vụ'
                    placeholder='Chức vụ'
                    classNameLabel='text-[#344054] text-sm font-normal'
                  />
                  <InputRoot
                    name='phoneNumber'
                    className='bg-white'
                    label='Số điện thoại'
                    placeholder='Số điện thoại'
                    classNameLabel='text-[#344054] text-sm font-normal'
                  />
                </div>
                <div className='mt-4 box-border flex justify-between gap-4'>
                  <div className='w-[50%]'>
                    <p className='text-sm font-normal text-[#344054]'>Phòng ban</p>
                    <SelectRoot
                      className='mt-2 flex justify-between rounded-lg border bg-white p-[11px]'
                      classNameOptionList='top-8'
                      options={[
                        { label: 'IT', value: 'IT' },
                        { label: 'Nhân sự', value: 'Nhân sự' },
                      ]}
                      firstValue={{ label: 'Phòng ban', value: '' }}
                      name='deparmentCode'
                    />
                  </div>
                </div>
                <div className='mt-4 box-border flex justify-between gap-4'>
                  <InputRoot
                    name='email'
                    className='bg-white'
                    label='Email'
                    placeholder='example@example.com'
                    classNameLabel='text-[#344054] text-sm font-normal'
                  />
                </div>
                <div className='mt-4 box-border flex justify-between gap-4'>
                  <TextAreaRoot
                    name='note'
                    className='h-[136px] bg-white'
                    label='Ghi chú'
                    placeholder='Nhập mô tả nếu có'
                    classNameLabel='text-[#344054] text-sm font-normal'
                  />
                </div>
              </div>
              <div className='w-[50%] gap-4 rounded-[10px] bg-[#E0F9EA] p-4'>
                <div className='box-border flex justify-between gap-4'>
                  <div className='w-[50%]'>
                    <p className='text-sm font-normal text-[#344054]'>Ngày sinh</p>
                    <DatePicker
                      onChange={onChangeBirthday}
                      placeholder='Ngày sinh'
                      className='mt-2 flex justify-between rounded-lg border bg-white p-[11px]'
                    />
                  </div>
                  <div className='w-[50%]'>
                    <p className='text-sm font-normal text-[#344054]'>Giới tính</p>
                    <SelectRoot
                      className='mt-2 flex justify-between rounded-lg border bg-white p-[11px]'
                      classNameOptionList='top-8'
                      options={[
                        { label: 'Nam', value: 'Nam' },
                        { label: 'Nữ', value: 'Nữ' },
                      ]}
                      firstValue={{ label: 'Giới tính', value: '' }}
                      name='gender'
                    />
                  </div>
                </div>
                <div className='mt-4 box-border flex justify-between gap-4'>
                  <InputRoot
                    name='bhxh'
                    className='bg-white'
                    label='BHXH'
                    placeholder='BHXH'
                    classNameLabel='text-[#344054] text-sm font-normal'
                  />
                  <InputRoot
                    name='MST'
                    className='bg-white'
                    label='Mã số thuế'
                    placeholder='Điền MST'
                    classNameLabel='text-[#344054] text-sm font-normal'
                  />
                </div>
                <div className='mt-4 box-border flex justify-between gap-4'>
                  <div className='w-[50%]'>
                    <InputRoot
                      name='CCCD'
                      className='bg-white'
                      label='CCCD'
                      placeholder='Điền CCCD'
                      classNameLabel='text-[#344054] text-sm font-normal'
                    />
                  </div>

                  <div className='w-[50%]'>
                    <p className='text-sm font-normal text-[#344054]'>Ngày cấp</p>
                    <DatePicker
                      onChange={onChangeBirthday}
                      placeholder='Ngày cấp'
                      className='mt-2 flex justify-between rounded-lg border bg-white p-[11px]'
                    />
                  </div>
                </div>
                <div className='mt-4 box-border flex justify-between gap-4'>
                  <InputRoot
                    name='addressRelease'
                    className='bg-white'
                    label='Nơi cấp'
                    placeholder='Điền nơi cấp'
                    classNameLabel='text-[#344054] text-sm font-normal'
                  />
                </div>
                <div className='mt-4 box-border flex justify-between gap-4'>
                  <InputRoot
                    name='address1'
                    className='bg-white'
                    label='Địa chỉ thường trú'
                    placeholder='Điền địa chỉ thường trú'
                    classNameLabel='text-[#344054] text-sm font-normal'
                  />
                </div>
                <div className='mt-4 box-border flex justify-between gap-4'>
                  <InputRoot
                    name='address2'
                    className='bg-white'
                    label='Địa chỉ tạm trú'
                    placeholder='Điền địa chỉ tạm trú'
                    classNameLabel='text-[#344054] text-sm font-normal'
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='mt-5 border-b-2 border-b-[#E4E7EC] pb-6'>
            <span className='text-base font-semibold text-[#344054]'>Thời gian làm việc</span>
            <div className='mt-4 flex items-end gap-6'>
              <div className='w-[34%]'>
                <p className='text-sm font-normal text-[#344054]'>Ngày bắt đầu làm</p>
                <DatePicker
                  onChange={onChangeBirthday}
                  placeholder='Chọn ngày'
                  className='mt-2 flex justify-between rounded-lg border bg-white p-[11px]'
                />
              </div>
              <div className='w-[34%]'>
                <p className='text-sm font-normal text-[#344054]'>Ngày nghỉ việc</p>
                <DatePicker
                  onChange={onChangeBirthday}
                  disabled={!isQuitJob}
                  placeholder='Chọn ngày'
                  className='mt-2 flex justify-between rounded-lg border bg-white p-[11px]'
                />
              </div>
              <Checkbox
                checked={isQuitJob}
                name='Nghỉ việc'
                label='Nghỉ việc'
                onChange={() => {
                  setIsQuitJob(!isQuitJob);
                }}
              />
            </div>
          </div>
          <div className='mt-5'>
            <span className='text-base font-semibold text-[#344054]'>Tài liệu, chứng từ</span>
            <div className='mt-4 flex items-end gap-6'>
              <Upload {...props}>
                <Button
                  className='flex items-center gap-2 rounded-lg border bg-[#F1F6FD] px-[14px] py-2 text-sm font-semibold text-[#365FBF] hover:cursor-pointer hover:border-[#365FBF]'
                  iconStart={<IconRoot icon={IconVariable.upload} />}>
                  Tải lên
                </Button>
              </Upload>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

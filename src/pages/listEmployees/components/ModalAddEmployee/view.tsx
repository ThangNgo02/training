import type { UploadFile, UploadProps } from 'antd';
import { DatePicker, Upload } from 'antd';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import * as yup from 'yup';

import Button from '@/components/button';
import { Checkbox } from '@/components/checkbox';
import Form from '@/components/form';
import IconRoot from '@/components/icon';
import { IconVariable } from '@/components/icon/types';
import InputRoot from '@/components/input';
import SelectRoot from '@/components/select';
import TextAreaRoot from '@/components/textarea';

import { type IModalAddEmployeeProps } from './type';

export function ModalAddEmployeeView({
  setIsOpenModalAdd,
  listDepartment,
  handleSubmit,
  fileList,
  setFileList,
}: IModalAddEmployeeProps) {
  const methods = useFormContext();
  const phoneRegExp = /(84|0[357-9|])+(\d{8})\b/g;
  const cccdRegExp = /^\d{9}$|^\d{12}$/;
  const [isQuitJob, setIsQuitJob] = useState<boolean>(false);

  const handleChange: UploadProps['onChange'] = info => {
    let newFileList = [...info.fileList];
    newFileList = newFileList.map(file => {
      if (file.response) {
        file.url = file.response.url;
      }
      return file;
    });
    if (setFileList) {
      setFileList(newFileList);
    }
    return false;
  };

  return (
    <Form
      onSubmit={handleSubmit}
      validator={{
        code: yup.string().typeError('Vui lòng nhập mã nhân viên').required('Vui lòng nhập mã nhân viên'),
        fullName: yup
          .string()
          .typeError('Vui lòng nhập họ tên cho nhân viên')
          .required('Vui lòng nhập họ tên cho nhân viên'),
        gender: yup
          .string()
          .typeError('Vui lòng chọn giới tính cho nhân viên')
          .required('Vui lòng chọn giới tính cho nhân viên'),
        departmentCode: yup
          .string()
          .typeError('Vui lòng chọn phòng ban cho nhân viên')
          .required('Vui lòng chọn phòng ban cho nhân viên'),
        phoneNumber: yup.string().nullable().notRequired().matches(phoneRegExp, 'Số điện thoại không hợp lệ'),
        email: yup.string().nullable().notRequired().email('Email không hợp lệ. Vui lòng nhập email khác'),
        identityCard: yup.string().nullable().notRequired().matches(cccdRegExp, 'CCCD hoặc CMND không hợp lệ'),
      }}>
      <div className='fixed bottom-0 left-0 right-0 top-0 z-50 bg-black p-1'>
        <div className='relative max-h-[100vh] overflow-y-auto rounded-xl bg-white'>
          <div className='sticky top-0 z-50 flex items-center justify-between border-b-[1px] border-[#E4E7EC] bg-white px-6  py-6'>
            <span className='text-[18px] font-semibold text-[#344054]'>Thêm hồ sơ nhân viên</span>
            <div className='flex items-center gap-4'>
              <Button
                onClick={() => {
                  setIsOpenModalAdd(false);
                }}
                type='button'
                text='Đóng'
                className='w-[90px] rounded-lg border border-[#98A2B3] px-4 py-2 text-center text-sm font-medium text-[#344054] hover:cursor-pointer hover:border-[#2DB976] hover:text-[#2DB976]'
              />
              <Button
                text='Lưu'
                type='submit'
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
                        isRequire={true}
                        name='code'
                        className='bg-white'
                        label='Mã nhân viên'
                        placeholder='Mã nhân viên'
                        classNameLabel='text-[#344054] text-sm font-normal'
                        errorString={methods?.formState?.errors?.code?.toString()}
                      />
                    </div>
                    <div className='w-[50%]'>
                      <InputRoot
                        isRequire={true}
                        name='fullName'
                        className='bg-white'
                        label='Tên nhân viên'
                        placeholder='Tên nhân viên'
                        classNameLabel='text-[#344054] text-sm font-normal'
                        errorString={methods?.formState?.errors?.fullName?.toString()}
                      />
                    </div>
                  </div>
                  <div className='mt-4 box-border flex justify-between gap-4'>
                    <div className='w-[50%]'>
                      <InputRoot
                        name='position'
                        className='bg-white'
                        label='Chức vụ'
                        placeholder='Chức vụ'
                        classNameLabel='text-[#344054] text-sm font-normal'
                      />
                    </div>
                    <div className='w-[50%]'>
                      <p className='text-sm font-normal text-[#344054]'>
                        <span className='text-red-500'>*</span> Phòng ban
                      </p>
                      <SelectRoot
                        className='mt-2 flex justify-between rounded-lg border bg-white p-[11px]'
                        classNameOptionList='top-8 max-h-[226px] overflow-y-auto'
                        options={listDepartment}
                        firstValue={{ label: 'Phòng ban', value: '' }}
                        name='departmentCode'
                        errorString={methods?.formState?.errors?.departmentCode?.toString()}
                      />
                    </div>
                  </div>
                  <div className='mt-4 box-border flex justify-between gap-4'>
                    <div className='w-[50%]'>
                      <p className='text-sm font-normal text-[#344054]'>Bậc</p>
                      <SelectRoot
                        className='mt-2 flex justify-between rounded-lg border bg-white p-[11px]'
                        classNameOptionList='top-8'
                        options={[
                          { label: '0', value: '0' },
                          { label: '1', value: '1' },
                          { label: '2', value: '2' },
                          { label: '3', value: '3' },
                          { label: '4', value: '4' },
                          { label: '5', value: '5' },
                          { label: '6', value: '6' },
                          { label: '7', value: '7' },
                          { label: '8', value: '8' },
                        ]}
                        firstValue={{ label: 'Chọn bậc', value: '' }}
                        name='staffMetaDataLevel'
                      />
                    </div>
                    <div className='w-[50%]'>
                      <InputRoot
                        name='phoneNumber'
                        className='bg-white'
                        label='Số điện thoại'
                        placeholder='Số điện thoại'
                        classNameLabel='text-[#344054] text-sm font-normal'
                        errorString={methods?.formState?.errors?.phoneNumber?.toString()}
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
                        name='birthDate'
                        placeholder='Ngày sinh'
                        className='mt-2 flex justify-between rounded-lg border bg-white p-[11px]'
                      />
                    </div>
                    <div className='w-[50%]'>
                      <p className='text-sm font-normal text-[#344054]'>
                        <span className='text-red-500'>*</span> Giới tính
                      </p>
                      <SelectRoot
                        className='mt-2 flex justify-between rounded-lg border bg-white p-[11px]'
                        classNameOptionList='top-8'
                        options={[
                          { label: 'Nam', value: 'MALE' },
                          { label: 'Nữ', value: 'FEMALE' },
                        ]}
                        firstValue={{ label: 'Giới tính', value: '' }}
                        name='gender'
                        errorString={methods?.formState?.errors?.gender?.toString()}
                      />
                    </div>
                  </div>
                  <div className='mt-4 box-border flex justify-between gap-4'>
                    <InputRoot
                      name='socialInsuranceCode'
                      className='bg-white'
                      label='BHXH'
                      placeholder='BHXH'
                      classNameLabel='text-[#344054] text-sm font-normal'
                    />
                    <InputRoot
                      name='taxCode'
                      className='bg-white'
                      label='Mã số thuế'
                      placeholder='Điền MST'
                      classNameLabel='text-[#344054] text-sm font-normal'
                    />
                  </div>
                  <div className='mt-4 box-border flex justify-between gap-4'>
                    <div className='w-[50%]'>
                      <InputRoot
                        name='identityCard'
                        className='bg-white'
                        label='CCCD'
                        placeholder='Điền CCCD'
                        classNameLabel='text-[#344054] text-sm font-normal'
                        errorString={methods?.formState?.errors?.identityCard?.toString()}
                      />
                    </div>

                    <div className='w-[50%]'>
                      <p className='text-sm font-normal text-[#344054]'>Ngày cấp</p>
                      <DatePicker
                        name='issueDateIdentityCard'
                        placeholder='Ngày cấp'
                        className='mt-2 flex justify-between rounded-lg border bg-white p-[11px]'
                      />
                    </div>
                  </div>
                  <div className='mt-4 box-border flex justify-between gap-4'>
                    <InputRoot
                      name='issuePlaceIdentityCard'
                      className='bg-white'
                      label='Nơi cấp'
                      placeholder='Điền nơi cấp'
                      classNameLabel='text-[#344054] text-sm font-normal'
                    />
                  </div>
                  <div className='mt-4 box-border flex justify-between gap-4'>
                    <InputRoot
                      name='permanentAddress'
                      className='bg-white'
                      label='Địa chỉ thường trú'
                      placeholder='Điền địa chỉ thường trú'
                      classNameLabel='text-[#344054] text-sm font-normal'
                    />
                  </div>
                  <div className='mt-4 box-border flex justify-between gap-4'>
                    <InputRoot
                      name='temporaryAddress'
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
                    name='hireDate'
                    placeholder='Chọn ngày bắt đầu làm việc'
                    className='mt-2 flex justify-between rounded-lg border bg-white p-[11px]'
                  />
                </div>
                <div className='w-[34%]'>
                  <p className='text-sm font-normal text-[#344054]'>Ngày nghỉ việc</p>
                  <DatePicker
                    name='resignDate'
                    disabled={!isQuitJob}
                    placeholder='Chọn ngày thôi việc'
                    className='mt-2 flex justify-between rounded-lg border bg-white p-[11px]'
                  />
                </div>
                <Checkbox
                  checked={isQuitJob}
                  name='isResigned'
                  label='Nghỉ việc'
                  onChange={() => {
                    setIsQuitJob(!isQuitJob);
                  }}
                />
              </div>
            </div>
            <div className='mt-5'>
              <span className='text-base font-semibold text-[#344054]'>Tài liệu, chứng từ</span>
              <div className='mt-4 flex items-center gap-8'>
                <Upload
                  showUploadList={false}
                  onChange={handleChange}
                  fileList={fileList}
                  multiple={true}>
                  <Button
                    type='button'
                    className='flex items-center gap-2 rounded-lg border bg-[#F1F6FD] px-[14px] py-2 text-sm font-semibold text-[#365FBF] hover:cursor-pointer hover:border-[#365FBF]'
                    iconStart={<IconRoot icon={IconVariable.upload} />}>
                    Tải lên
                  </Button>
                </Upload>

                <div className='flex flex-wrap gap-[10px]'>
                  {fileList?.map(file => (
                    <div
                      key={file.uid}
                      className='rounded-md bg-[#f0f0f0] px-2 py-1 text-sm'>
                      {file.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
}

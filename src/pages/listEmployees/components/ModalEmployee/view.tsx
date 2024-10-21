import type { UploadProps } from 'antd';
import { Upload } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useContext, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import * as yup from 'yup';

import { arrGender, arrLevel } from '@/common/const';
import Button from '@/components/button';
import Form from '@/components/form';
import IconRoot from '@/components/icon';
import { IconVariable } from '@/components/icon/types';
import InputRoot from '@/components/input';
import SelectRoot from '@/components/select';
import TextAreaRoot from '@/components/textarea';
import toastDefault, { EnumToast } from '@/components/toast';
import { ModalContext } from '@/context/contextStore';
import { useDepartments } from '@/hooks/useDepartments';

import { CustomCheckbox } from '../CustomCheckbox';
import { DatePickerField } from '../DatePickerField';
import { type IModalEmployeeProps } from './type';
import Modal from '@/components/modal';
dayjs.extend(customParseFormat);

export function ModalEmployeeView({
  setIsOpenModal,
  handleSubmitAdd,
  handleSubmitUpdate,
  fileList,
  setFileList,
  isUpdateNotAdd,
  fileListUpdate,
  isReset,
  setIsReset,
  setFileListUpdate,
  setEmployeeIdSelected,
  setFilesDeleted,
  isOpenModalLock,
  setIsOpenModalLock,
  handleConfirmModalLock,
  isOpenModalUnLock,
  setIsOpenModalUnLock,
  handleConfirmModalUnLock,
}: IModalEmployeeProps) {
  const methods = useFormContext();
  const phoneRegExp = /(84|0[357-9|])+(\d{8})\b/g;
  const cccdRegExp = /^\d{9}$|^\d{12}$/;
  const [isQuitJob, setIsQuitJob] = useState<boolean>(false);
  const { detailEmployee, handleSetEmployeeDetail } = useContext(ModalContext);

  const listDepartments = useDepartments();

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
    return false; // Ngăn chặn hành vi upload
  };
  const handleRemoveFile = (fileUid: string) => {
    if (setFileList) {
      const newFileList = fileList?.filter(file => file.uid !== fileUid);
      if (newFileList) {
        setFileList(newFileList);
      }
    }
  };

  const handleChangeUpdate: UploadProps['onChange'] = info => {
    let newFileList = [...info.fileList];
    newFileList = newFileList.map(file => {
      if (file.response) {
        file.url = file.response.url;
      }
      return file;
    });
    if (setFileListUpdate) {
      setFileListUpdate(newFileList);
    }
    return false; // Ngăn chặn hành vi upload
  };
  const handleRemoveFileUpdate = (fileUid: string) => {
    if (setFileListUpdate) {
      if (setFilesDeleted) {
        setFilesDeleted((prev: string[]) => [...prev, fileUid]);
      }
      const newFileList = fileListUpdate?.filter(file => file.uid !== fileUid);
      if (newFileList) {
        setFileListUpdate(newFileList);
      }
    }
  };
  const beforeUpload = () => {
    return false;
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
    setEmployeeIdSelected(0);
    if (setIsReset) {
      setIsReset(true);
    }
    handleSetEmployeeDetail({});
  };

  const formatDate = (dateString: any) => {
    if (!dateString) return null;
    return dayjs(dateString.toString(), 'DD-MM-YYYY').format('YYYY-MM-DD');
  };

  const setOpenModalLock = (state: boolean) => {
    if (setIsOpenModalLock) {
      setIsOpenModalLock(state);
    }
  }
  const handleCloseModalLock = () => {
    if (setIsOpenModalLock) {
      setIsOpenModalLock(false)
    }
  }

  const setOpenModalUnLock = (state: boolean) => {
    if (setIsOpenModalUnLock) {
      setIsOpenModalUnLock(state);
    }
  }
  const handleCloseModalUnLock = () => {
    if (setIsOpenModalUnLock) {
      setIsOpenModalUnLock(false)
    }
  }

  return (
    <Form
      onSubmit={isUpdateNotAdd === true ? handleSubmitAdd : handleSubmitUpdate}
      defaultValues={
        isUpdateNotAdd
          ? {}
          : {
              code: detailEmployee?.code || '',
              fullName: detailEmployee?.fullName || '',
              position: detailEmployee?.position || '',
              phoneNumber: detailEmployee?.phoneNumber || '',
              email: detailEmployee?.email || '',
              identityCard: detailEmployee?.identityCard || '',
              issuePlaceIdentityCard: detailEmployee?.issuePlaceIdentityCard || '',
              socialInsuranceCode: detailEmployee?.socialInsuranceCode || '',
              taxCode: detailEmployee?.taxCode || '',
              note: detailEmployee?.note || '',
              permanentAddress: detailEmployee?.permanentAddress || '',
              temporaryAddress: detailEmployee?.temporaryAddress || '',

              issueDateIdentityCard: formatDate(detailEmployee?.issueDateIdentityCard) ?? null,
              birthDate: formatDate(detailEmployee?.birthDate) ?? null,
              hireDate: formatDate(detailEmployee?.hireDate) ?? null,
              resignDate: formatDate(detailEmployee?.resignDate) ?? null,

              departmentCode: detailEmployee?.department?.code || '',
              gender: detailEmployee?.gender || '',
              staffMetaDataLevel: detailEmployee?.staffMetaDataLevel || '',

              isResigned: detailEmployee?.isResigned !== 'RESIGNED',
            }
      }
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
          phoneNumber: yup
          .string()
          .nullable()
          .transform((value, originalValue) => (originalValue === '' ? null : value))
          .notRequired()
          .matches(phoneRegExp, 'Số điện thoại không hợp lệ'),
        
        identityCard: yup
          .string()
          .nullable()
          .transform((value, originalValue) => (originalValue === '' ? null : value))
          .notRequired()
          .matches(cccdRegExp, 'CCCD hoặc CMND không hợp lệ'),
        email: yup.string().nullable().notRequired().email('Email không hợp lệ. Vui lòng nhập email khác'),
        birthDate: yup.date().nullable().notRequired().typeError('Ngày sinh không hợp lệ'),
        issueDateIdentityCard: yup.date().nullable().notRequired().typeError('Ngày cấp CCCD không hợp lệ'),
        hireDate: yup.date().nullable().notRequired().typeError('Ngày bắt đầu làm việc không hợp lệ'),
        resignDate: yup
          .date()
          .nullable()
          .notRequired()
          .typeError('Ngày nghỉ việc không hợp lệ')
          .test('is-after-hireDate', 'Ngày nghỉ việc phải lớn hơn ngày bắt đầu làm việc', function (value) {
            const { hireDate } = this.parent;
            const isCheck = !hireDate || !value || dayjs(value).isAfter(dayjs(hireDate));
            if (hireDate && value && dayjs(value).isBefore(dayjs(hireDate))) {
              toastDefault(EnumToast.ERROR, 'Ngày nghỉ việc phải lớn hơn ngày bắt đầu làm việc', {
                position: 'top-center',
              });
            }
            return isCheck;
          }),
      }}>
      <Modal 
        isOpenModal={isOpenModalLock || false} 
        setIsOpenModal={setOpenModalLock} 
        title='Khóa người dùng' 
        content='Xác nhận khóa nguời dùng' 
        onClose={handleCloseModalLock}
        onConfirm={handleConfirmModalLock}/>
        <Modal 
        isOpenModal={isOpenModalUnLock || false} 
        setIsOpenModal={setOpenModalUnLock} 
        title='Mở khóa người dùng' 
        content='Xác nhận mở khóa nguời dùng' 
        onClose={handleCloseModalUnLock}
        onConfirm={handleConfirmModalUnLock}/>
      <div className='fixed bottom-0 left-0 right-0 top-0 z-50 bg-black p-1'>
        <div className='relative max-h-[100vh] overflow-y-auto rounded-xl bg-white'>
          <div className='sticky top-0 z-50 flex items-center justify-between border-b-[1px] border-[#E4E7EC] bg-white px-6  py-6'>
            <span className='text-[18px] font-semibold text-[#344054]'>
              {isUpdateNotAdd === false ? 'Chi tiết nhân viên' : 'Thêm hồ sơ nhân viên'}
            </span>
            <div className='flex items-center gap-4'>
              <Button
                onClick={handleCloseModal}
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
                        errorString={
                          // eslint-disable-next-line @typescript-eslint/no-base-to-string
                          methods?.formState?.errors?.code ? methods?.formState?.errors?.code?.toString() : ''
                        }
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
                        errorString={
                          // eslint-disable-next-line @typescript-eslint/no-base-to-string
                          methods?.formState?.errors?.fullName ? methods?.formState?.errors?.fullName?.toString() : ''
                        }
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
                        isReset={isReset}
                        className='mt-2 flex justify-between rounded-lg border bg-white p-[11px]'
                        classNameOptionList='top-8 max-h-[226px] overflow-y-auto'
                        options={listDepartments}
                        firstValue={
                          detailEmployee?.department?.code
                            ? listDepartments.find(item => item.value === detailEmployee.department.code)
                            : { label: 'Phòng ban', value: '' }
                        }
                        name='departmentCode'
                        errorString={
                          // eslint-disable-next-line @typescript-eslint/no-base-to-string
                          methods?.formState?.errors?.departmentCode
                            ? // eslint-disable-next-line @typescript-eslint/no-base-to-string
                              methods?.formState?.errors?.departmentCode?.toString()
                            : ''
                        }
                      />
                    </div>
                  </div>
                  <div className='mt-4 box-border flex justify-between gap-4'>
                    <div className='w-[50%]'>
                      <p className='text-sm font-normal text-[#344054]'>Bậc</p>
                      <SelectRoot
                        isReset={isReset}
                        className='mt-2 flex justify-between rounded-lg border bg-white p-[11px]'
                        classNameOptionList='top-8'
                        options={arrLevel}
                        firstValue={
                          detailEmployee.staffMetaDataLevel
                            ? arrLevel.find(item => item.value === detailEmployee.staffMetaDataLevel)
                            : { label: 'Chọn bậc', value: '' }
                        }
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
                        errorString={
                          // eslint-disable-next-line @typescript-eslint/no-base-to-string
                          methods?.formState?.errors?.phoneNumber
                            ? // eslint-disable-next-line @typescript-eslint/no-base-to-string
                              methods?.formState?.errors?.phoneNumber?.toString()
                            : ''
                        }
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
                      <DatePickerField
                        name='birthDate'
                        placeholder='Ngày sinh'
                        className='mt-2 flex justify-between rounded-lg border bg-white p-[11px]'
                        displayFormat='DD/MM/YYYY'
                      />
                    </div>
                    <div className='w-[50%]'>
                      <p className='text-sm font-normal text-[#344054]'>
                        <span className='text-red-500'>*</span> Giới tính
                      </p>
                      <SelectRoot
                        isReset={isReset}
                        className='mt-2 flex justify-between rounded-lg border bg-white p-[11px]'
                        classNameOptionList='top-8'
                        options={arrGender}
                        firstValue={
                          detailEmployee.gender
                            ? arrGender.find(item => item.value === detailEmployee.gender)
                            : { label: 'Giới tính', value: '' }
                        }
                        name='gender'
                        errorString={
                          // eslint-disable-next-line @typescript-eslint/no-base-to-string
                          methods?.formState?.errors?.gender
                            ? // eslint-disable-next-line @typescript-eslint/no-base-to-string
                              methods?.formState?.errors?.gender?.toString()
                            : ''
                        }
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
                        errorString={
                          // eslint-disable-next-line @typescript-eslint/no-base-to-string
                          methods?.formState?.errors?.identityCard
                            ? // eslint-disable-next-line @typescript-eslint/no-base-to-string
                              methods?.formState?.errors?.identityCard?.toString()
                            : ''
                        }
                      />
                    </div>

                    <div className='w-[50%]'>
                      <p className='text-sm font-normal text-[#344054]'>Ngày cấp</p>
                      <DatePickerField
                        name='issueDateIdentityCard'
                        placeholder='Ngày cấp'
                        className='mt-2 flex justify-between rounded-lg border bg-white p-[11px]'
                        displayFormat='DD/MM/YYYY'
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
                  <DatePickerField
                    name='hireDate'
                    placeholder='Chọn ngày bắt đầu làm việc'
                    className='mt-2 flex justify-between rounded-lg border bg-white p-[11px]'
                    displayFormat='DD/MM/YYYY'
                  />
                </div>
                <div className='w-[34%]'>
                  <p className='text-sm font-normal text-[#344054]'>Ngày nghỉ việc</p>
                  <DatePickerField
                    name='resignDate'
                    disabled={!isQuitJob && isUpdateNotAdd}
                    placeholder='Chọn ngày thôi việc'
                    className='mt-2 flex justify-between rounded-lg border bg-white p-[11px]'
                    displayFormat='DD/MM/YYYY'
                  />
                </div>
                <CustomCheckbox
                  control={methods?.control}
                  name='isResigned'
                  label='Nghỉ việc'
                  onChange={checked => {
                    setIsQuitJob(checked);
                  }}
                />
              </div>
            </div>
            <div className='mt-5'>
              <span className='text-base font-semibold text-[#344054]'>Tài liệu, chứng từ</span>
              {isUpdateNotAdd === true ? (
                <div className='mt-4 flex items-center gap-8'>
                  <Upload
                    showUploadList={false}
                    onChange={handleChange}
                    fileList={fileList}
                    beforeUpload={beforeUpload}
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
                        className='flex items-center gap-2 rounded-md bg-[#f0f0f0] px-2 py-1 text-sm'>
                        <span>{file.name}</span>
                        <Button
                          type='button'
                          className='text-red-500'
                          onClick={() => {
                            handleRemoveFile(file.uid);
                          }}
                          text='Xóa'
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className='mt-4 flex items-center gap-8'>
                  <Upload
                    showUploadList={false}
                    onChange={handleChangeUpdate}
                    fileList={fileListUpdate}
                    beforeUpload={beforeUpload}
                    multiple={true}>
                    <Button
                      type='button'
                      className='flex items-center gap-2 rounded-lg border bg-[#F1F6FD] px-[14px] py-2 text-sm font-semibold text-[#365FBF] hover:cursor-pointer hover:border-[#365FBF]'
                      iconStart={<IconRoot icon={IconVariable.upload} />}>
                      Tải lên
                    </Button>
                  </Upload>

                  <div className='flex flex-wrap gap-[10px]'>
                    {fileListUpdate?.map(file => (
                      <div
                        key={file.uid}
                        className='flex items-center gap-2 rounded-md bg-[#f0f0f0] px-2 py-1 text-sm'>
                        <span>{file.name}</span>
                        <Button
                          type='button'
                          className='text-red-500'
                          onClick={() => {
                            handleRemoveFileUpdate(file.uid);
                          }}
                          text='Xóa'
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {isUpdateNotAdd === false && (
              <div className='mt-5 flex items-center justify-between'>
                {
                  detailEmployee.status === 'DEACTIVE' ? (
                    <>
                      <div>
                        <p className='text-base font-semibold text-[#344054]'>Mở khóa người dùng</p>
                        <p className='text-sm font-normal text-[#344054]'>Cho phép sử dụng thông tin này</p>
                      </div>
                      <Button
                        onClick={() => setOpenModalUnLock(true)}
                        text='Mở khóa'
                        type='button'
                        className='flex items-center gap-2 rounded-lg border border-[#68E2A1] bg-white px-[14px] py-2 text-sm font-semibold text-[#12B76A] hover:cursor-pointer hover:border-[#12B76A]'
                      />
                    </>
                    ) : (
                    <>
                      <div>
                        <p className='text-base font-semibold text-[#344054]'>Khóa người dùng</p>
                        <p className='text-sm font-normal text-[#344054]'>Khóa và không cho phép sử dụng thông tin này</p>
                      </div>
                      <Button
                        onClick={() => setOpenModalLock(true)}
                        text='Khóa'
                        type='button'
                        className='flex items-center gap-2 rounded-lg border border-[#FDA29B] bg-white px-[14px] py-2 text-sm font-semibold text-[#B42318] hover:cursor-pointer hover:border-[#B42318]'
                      />
                    </>
                  )
               }
              </div>
            )}
          </div>
        </div>
      </div>
    </Form>
  );
}

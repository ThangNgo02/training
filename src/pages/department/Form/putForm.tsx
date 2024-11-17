import { Button, Modal } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import * as yup from 'yup';

import Form, { type IFormRef } from '@/components/form';
import IconRoot from '@/components/icon';
import { IconVariable } from '@/components/icon/types';
import InputRoot from '@/components/input';
import SelectRoot from '@/components/Select';

export enum BlockForTimesheet {
  DRIVER = 'DRIVER',
  FACTORY = 'FACTORY',
  OFFICE = 'OFFICE',
  DELIVERY = 'DELIVERY',
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface PutFormValues {
  code: string;
  name: string;
  note: string;
  phonenumber: string;
  blockForTimesheet: BlockForTimesheet;
}

const validationSchema = {
  code: yup.string().required('Mã phòng ban không được để trống'),
  name: yup.string().required('Tên phòng ban không được để trống'),
  blockForTimesheet: yup.string().required('Khối không được để trống'),
};

const defaultFormValues: PutFormValues = {
  code: '',
  name: '',
  note: '',
  phonenumber: '',
  blockForTimesheet: BlockForTimesheet.DRIVER,
};

// eslint-disable-next-line @typescript-eslint/naming-convention
const PutForm = ({
  onSubmit,
  onClose,
  isOpen,
  departmentData,
}: {
  onSubmit: (values: PutFormValues) => void;
  onClose: () => void;
  isOpen: boolean;
  departmentData?: Partial<PutFormValues>;
}) => {
  const methods = useFormContext();
  const formRef = useRef<IFormRef>(null);
  const [key, setKey] = useState(0); // Add this to force re-render

  // Update form when modal opens/closes or data changes
  useEffect(() => {
    if (isOpen && departmentData) {
      formRef.current?.reset({
        code: departmentData.code ?? '',
        name: departmentData.name ?? '',
        note: departmentData.note ?? '',
        phonenumber: departmentData.phonenumber ?? '',
        blockForTimesheet: departmentData.blockForTimesheet ?? BlockForTimesheet.DRIVER,
      });
      setKey(prev => prev + 1); // Force re-render
    }
  }, [isOpen, departmentData]);

  const handleClose = () => {
    formRef.current?.reset(defaultFormValues);
    onClose();
  };

  const handleFormSubmit = (values: PutFormValues) => {
    onSubmit({
      code: values.code,
      name: values.name,
      note: values.note,
      phonenumber: values.phonenumber,
      blockForTimesheet: values.blockForTimesheet,
    });
    formRef.current?.reset(defaultFormValues);
  };

  return (
    <div>
      <Modal
        open={isOpen}
        onCancel={handleClose}
        footer={null}
        width={800}
        centered
        maskClosable={false}
        title='Sửa phòng ban'
        className=''>
        <Form
          key={key}
          ref={formRef}
          onSubmit={handleFormSubmit}
          validator={validationSchema}
          defaultValues={departmentData ?? defaultFormValues}>
          <div
            onClick={e => {
              e.stopPropagation();
            }}
            className=''>
            <div className='grid grid-cols-2 space-x-3'>
              <div>
                <div
                  className='mb-4 w-full'
                  onClick={e => {
                    e.stopPropagation();
                  }}>
                  <div className='pointer-events-none mb-2 flex items-center'>
                    <IconRoot
                      icon={IconVariable.required}
                      className='hover:cursor-none'
                    />
                    <label
                      htmlFor='code'
                      className='text-sm font-bold text-gray-700'>
                      Mã phòng ban
                    </label>
                  </div>
                  <InputRoot
                    type='text'
                    id='code'
                    name='code'
                    placeholder='Điền mã phòng ban'
                    // eslint-disable-next-line @typescript-eslint/no-base-to-string
                    errorString={methods?.formState?.errors?.code ? methods?.formState?.errors?.code?.toString() : ''}
                    className='w-full rounded-md border px-3 py-2 focus:outline-none'
                  />
                </div>
                <div
                  className='mb-4 w-full'
                  onClick={e => {
                    e.stopPropagation();
                  }}>
                  <label
                    htmlFor='phonenumber'
                    className='mb-2 block text-sm font-bold text-gray-700'>
                    Số điện thoại
                  </label>

                  <div className='relative'>
                    <InputRoot
                      type='text'
                      id='phonenumber'
                      name='phonenumber'
                      placeholder='Điền số điện thoại'
                      className={`w-full rounded-md border px-3 py-2 focus:outline-none`}
                    />
                  </div>
                </div>
              </div>

              <div>
                <div className=' mb-4 w-full'>
                  <div className='pointer-events-none mb-2 flex items-center'>
                    <IconRoot
                      icon={IconVariable.required}
                      className='hover:cursor-none'
                    />
                    <label
                      htmlFor='name'
                      className=' block text-sm font-bold text-gray-700'>
                      Tên phòng ban
                    </label>
                  </div>
                  <InputRoot
                    type='text'
                    id='name'
                    name='name'
                    placeholder='Điền tên phòng ban'
                    // eslint-disable-next-line @typescript-eslint/no-base-to-string
                    errorString={methods?.formState?.errors?.name ? methods?.formState?.errors?.name?.toString() : ''}
                    className='w-full rounded-md border px-3 py-2 focus:outline-none'
                  />
                </div>

                <div className=' mb-4 w-full'>
                  <div className='pointer-events-none flex items-center'>
                    <IconRoot
                      icon={IconVariable.required}
                      className='mb-1.5 hover:cursor-none'
                    />
                    <label
                      htmlFor='blockForTimesheet'
                      className='mb-1.5 block text-sm font-bold text-gray-700'>
                      Khối
                    </label>
                  </div>
                  <SelectRoot
                    options={[
                      { value: BlockForTimesheet.DRIVER, label: 'Driver' },
                      { value: BlockForTimesheet.FACTORY, label: 'Factory' },
                      { value: BlockForTimesheet.OFFICE, label: 'Office' },
                      { value: BlockForTimesheet.DELIVERY, label: 'Delivery' },
                    ]}
                    name='blockForTimesheet'
                    firstValue={{ value: '', label: 'Chọn loại phòng ban' }}
                    errorString={
                      methods?.formState?.errors?.blockForTimesheet
                        ? // eslint-disable-next-line @typescript-eslint/no-base-to-string
                          methods?.formState?.errors?.blockForTimesheet?.toString()
                        : ''
                    }
                    className='w-full rounded-md border px-3 py-3 focus:outline-none'
                  />
                </div>
              </div>
            </div>
          </div>

          <div
            className='flex items-center justify-end gap-4'
            onClick={e => {
              e.stopPropagation();
            }}>
            <div className='mb-4 w-full'>
              <label
                htmlFor='note'
                className='  text-sm font-bold text-gray-700'>
                Ghi chú
              </label>
              <InputRoot
                type='text'
                id='note'
                name='note'
                placeholder='Ghi chú'
                className={`w-full rounded-md border px-3 py-2 focus:outline-none`}
              />
            </div>
          </div>

          <div
            className='flex items-center justify-end gap-4'
            onClick={e => {
              e.stopPropagation();
            }}>
            <Button
              className='bg-gray-400 text-white hover:bg-gray-500'
              onClick={handleClose}>
              Đóng
            </Button>
            <Button
              htmlType='submit'
              className='bg-[#4d7bc2] text-white hover:bg-[#3d69b0]'>
              Cập nhật
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default PutForm;

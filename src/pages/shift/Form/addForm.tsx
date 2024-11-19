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
export interface AddFormValues {
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

const defaultFormValues: AddFormValues = {
  code: '',
  name: '',
  note: '',
  phonenumber: '',
  blockForTimesheet: '' as BlockForTimesheet,
};

// eslint-disable-next-line @typescript-eslint/naming-convention
const AddForm = ({
  onSubmit,
  onClose,
  isOpen,
}: {
  onSubmit: (values: AddFormValues) => void;
  onClose: () => void;
  isOpen: boolean;
}) => {
  const methods = useFormContext();
  const formRef = useRef<IFormRef>(null);
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      formRef.current?.reset(defaultFormValues);
    }
    setKey(prev => prev + 1);
  }, [isOpen]);

  const handleClose = () => {
    formRef.current?.reset(defaultFormValues);
    onClose();
  };

  const handleFormSubmit = (values: AddFormValues) => {
    onSubmit(values);
    formRef.current?.reset(defaultFormValues);
  };

  return (
    <div>
      <Modal
        open={isOpen}
        onCancel={handleClose}
        footer={null}
        closeIcon={null} // Remove close icon
        width='100%'
        centered
        style={{
          margin: 0,
          padding: 0,
          maxWidth: '100vw', // Full width
          maxHeight: '100vh', // Full height
          overflow: 'hidden', // Prevent overflow
          borderRadius: 0, // Remove border radius
        }}
        maskClosable={false}
        className='p-0'
        title={null}>
        <div className='inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='h-screen w-screen overflow-y-auto bg-white '>
            <Form
              key={key}
              ref={formRef}
              onSubmit={handleFormSubmit}
              validator={validationSchema}
              defaultValues={defaultFormValues}>
              <div
                onClick={e => {
                  e.stopPropagation();
                }}
                className=''>
                <div className='flex justify-between'>
                  <h1 className='text-3xl font-bold'>Them moi ca lam viec</h1>

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
                      Thêm
                    </Button>
                  </div>
                </div>

                <hr className=' mt-3 w-full' />
              </div>
              <div>
                <div></div>
              </div>
            </Form>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AddForm;

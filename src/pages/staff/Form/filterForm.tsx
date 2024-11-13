import { CloseCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import Form from '@/components/form';
import InputRoot from '@/components/input';

import { type IStaffDataType } from '..';

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface FilterFormValues {
  position: string;
  socialInsuranceCode: string;
  taxCode: string;
  departmentCode: string;
  status: string;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const FilterForm = ({
  onSubmit,
  totalData,
}: {
  onSubmit: (values: FilterFormValues) => void;
  totalData: IStaffDataType[];
}) => {
  const methods = useFormContext();
  const [formValues, setFormValues] = useState<FilterFormValues>({
    position: '',
    socialInsuranceCode: '',
    taxCode: '',
    departmentCode: '',
    status: '',
  });

  // Get all departments from totalData
  const allDepartments = totalData.map((item: IStaffDataType) => ({
    id: item.department!.id,
    code: item.department!.code,
  }));

  const handleInputChange = (fieldName: keyof FilterFormValues, value: string) => {
    setFormValues(prev => ({ ...prev, [fieldName]: value }));
    methods.setValue(fieldName, value);
  };

  const handleResetFilter = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    const resetValues = {
      position: '',
      socialInsuranceCode: '',
      taxCode: '',
      departmentCode: '',
      status: '',
    };

    // Update local state
    setFormValues(resetValues);
    // Reset form values using methods from useFormContext
    methods.setValue('position', '');
    methods.setValue('socialInsuranceCode', '');
    methods.setValue('taxCode', '');
    methods.setValue('departmentCode', '');
    methods.setValue('status', '');
  };

  const handleResetInput = (e: React.MouseEvent<HTMLElement>, fieldName: string) => {
    e.stopPropagation();
    setFormValues(prev => ({ ...prev, [fieldName]: '' }));
    methods?.setValue(fieldName, '');
  };

  const handleSubmit = () => {
    onSubmit(formValues); // Pass the current form values directly
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div className='grid grid-cols-2 gap-3'>
        <div className='w-60'>
          <div
            className='mb-4 w-full'
            onClick={e => {
              e.stopPropagation();
            }}>
            <label
              htmlFor='position'
              className='mb-1 block text-sm font-bold text-gray-700'>
              Chức vụ
            </label>
            <InputRoot
              type='text'
              id='position'
              name='position'
              placeholder='Điền chức vụ'
              value={formValues.position}
              onChange={e => {
                handleInputChange('position', e.target.value);
              }}
              className='w-full rounded-md border px-3 py-2 focus:outline-none'
              iconEnd={
                formValues.position && (
                  <CloseCircleOutlined
                    className='hover:cursor-pointer'
                    onClick={e => {
                      handleResetInput(e, 'position');
                    }}
                  />
                )
              }
            />
          </div>

          <div
            className='mb-6'
            onClick={e => {
              e.stopPropagation();
            }}>
            <label
              htmlFor='taxCode'
              className='mb-1 block text-sm font-bold text-gray-700'>
              MST
            </label>

            <div className='relative'>
              <InputRoot
                type='text'
                id='taxCode'
                name='taxCode'
                placeholder='Điền MST'
                value={formValues.taxCode}
                onChange={e => {
                  handleInputChange('taxCode', e.target.value);
                }}
                className='w-full rounded-md border px-3 py-2 focus:outline-none'
                iconEnd={
                  formValues.taxCode && (
                    <CloseCircleOutlined
                      className='hover:cursor-pointer'
                      onClick={e => {
                        handleResetInput(e, 'taxCode');
                      }}
                    />
                  )
                }
              />
            </div>
          </div>

          <div
            className=' relative mb-6'
            onClick={e => {
              e.stopPropagation();
            }}>
            <label
              htmlFor='status'
              className='mb-1 block text-sm font-bold text-gray-700'>
              Trạng thái
            </label>
            <select
              name='status'
              id='status'
              value={formValues.status}
              onChange={e => {
                handleInputChange('status', e.target.value);
              }}
              className='w-full rounded-md border border-gray-400 px-3 py-2.5 font-semibold focus:border-green-500  '>
              <option
                value=''
                disabled
                hidden>
                Chọn trạng thái
              </option>
              <option value='ACTIVE'>Hoạt động</option>
              <option value='DEACTIVE'>Đã khóa</option>
              <option value='RESIGNED'>Đã nghỉ</option>
            </select>
            {formValues.status && (
              <CloseCircleOutlined
                style={{
                  position: 'absolute',
                  right: 18,
                  top: '58%',
                  transform: 'translateY(-10%)',
                  fontSize: '16px',
                }}
                className='hover:cursor-pointer'
                onClick={e => {
                  handleResetInput(e, 'status');
                }}
              />
            )}
          </div>
        </div>

        <div>
          <div className='  w-full'>
            <label
              htmlFor='socialInsuranceCode'
              className='mb-1 block text-sm font-bold text-gray-700'>
              BHXH
            </label>
            <InputRoot
              type='text'
              id='socialInsuranceCode'
              name='socialInsuranceCode'
              placeholder='Điền BHXH'
              value={formValues.socialInsuranceCode}
              onChange={e => {
                handleInputChange('socialInsuranceCode', e.target.value);
              }}
              className={`w-full rounded-md border px-3 py-2 focus:outline-none `}
              iconEnd={
                formValues.socialInsuranceCode && (
                  <CloseCircleOutlined
                    className='hover:cursor-pointer'
                    onClick={e => {
                      handleResetInput(e, 'socialInsuranceCode');
                    }}
                  />
                )
              }
            />
          </div>

          <div
            className=' relative mb-6'
            onClick={e => {
              e.stopPropagation();
            }}>
            <label
              htmlFor='departmentCode'
              className='mb-1 mt-4 block text-sm font-bold text-gray-700'>
              Phòng ban
            </label>
            <select
              name='departmentCode'
              id='departmentCode'
              value={formValues.departmentCode}
              onChange={e => {
                handleInputChange('departmentCode', e.target.value);
              }}
              className='w-full  rounded-md border border-gray-400 px-3 py-2.5 font-semibold'>
              <option
                value=''
                className='text-[##a8a8a8]'
                disabled
                hidden>
                Chọn phòng ban
              </option>
              {allDepartments.map((dept, index) => (
                <option
                  key={`${dept?.id}-${dept?.code}-${index}`}
                  value={dept.code}>
                  {dept.code}
                </option>
              ))}
            </select>
            {formValues.departmentCode && (
              <CloseCircleOutlined
                style={{
                  position: 'absolute',
                  right: 18,
                  top: '58%',
                  transform: 'translateY(-10%)',
                  fontSize: '16px',
                }}
                className='hover:cursor-pointer'
                onClick={e => {
                  handleResetInput(e, 'departmentCode');
                }}
              />
            )}
          </div>
        </div>
      </div>

      <div className='mt-5 flex items-center justify-end gap-4'>
        <Button
          className='mt-5 bg-gray-400 text-white hover:bg-gray-500'
          onClick={handleResetFilter}>
          Đặt lại
        </Button>
        <Button
          htmlType='submit'
          className='mt-5 bg-[#4d7bc2] text-white hover:bg-[#3d69b0]'>
          Áp dụng
        </Button>
      </div>
    </Form>
  );
};

export default FilterForm;

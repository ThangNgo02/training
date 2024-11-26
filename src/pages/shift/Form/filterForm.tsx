import { Button } from 'antd';
import { useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import Form, { type IFormRef } from '@/components/form';
import SelectRoot from '@/components/Select';

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface FilterFormValues {
  departmentCode: string;
}

const defaultFormValues: FilterFormValues = {
  departmentCode: '',
};

// eslint-disable-next-line @typescript-eslint/naming-convention
const FilterForm = ({
  onSubmit,
  totalData,
  onClose,
}: {
  onSubmit: (values: FilterFormValues) => void;
  onClose: () => void;
  totalData: any[];
}) => {
  const methods = useFormContext();
  const formRef = useRef<IFormRef>(null);
  const [selectKey, setSelectKey] = useState(0);
  // Get all departments from totalData
  const departments = [
    ...new Map(
      totalData
        .filter(item => item.departmentList && Array.isArray(item.departmentList))
        .flatMap(item =>
          item.departmentList.map((dept: { id: any; code: any; name: any }) => ({
            id: dept.id,
            code: dept.code,
            name: dept.name,
          })),
        )
        .map(dept => [dept.id, dept]), // Map with `id` as the key for deduplication
    ).values(),
  ];

  const handleFormSubmit = (values: FilterFormValues) => {
    onSubmit(values);
    formRef.current?.reset(defaultFormValues);
  };

  const handleReset = () => {
    // Reset form
    formRef.current?.reset(defaultFormValues);
    // Force re-render Select component
    setSelectKey(prev => prev + 1);
    // Submit with empty departmentCode
    onSubmit({ departmentCode: '' });
    // Reset the form field manually
    methods?.setValue('departmentCode', '');
    onClose();
  };

  return (
    <div>
      <Form
        ref={formRef}
        onSubmit={handleFormSubmit}
        defaultValues={defaultFormValues}>
        <div
          onClick={e => {
            e.stopPropagation();
          }}
          className=''>
          <h1>Phòng ban</h1>
          <SelectRoot
            key={selectKey} // Add key to force re-render
            options={departments.map(dept => ({
              value: dept.code,
              label: dept.name,
            }))}
            name='departmentCode'
            firstValue={{ value: '', label: 'Chọn phòng ban' }}
            className='mt-2 w-72 rounded-md border px-3 py-3 focus:outline-none'
          />

          <div
            className='mt-3 flex items-center justify-end gap-4'
            onClick={e => {
              e.stopPropagation();
            }}>
            <Button
              className='bg-gray-400 text-white hover:bg-gray-500'
              onClick={handleReset}>
              Đặt lại
            </Button>
            <Button
              htmlType='submit'
              className='bg-[#4d7bc2] text-white hover:bg-[#3d69b0]'>
              Áp dụng
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default FilterForm;

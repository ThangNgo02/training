import { Button } from 'antd';
import { useRef } from 'react';
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

  // Get all departments from totalData
  const departments = totalData
    .filter(item => item.departmentList && Array.isArray(item.departmentList))
    .flatMap(item =>
      item.departmentList.map((dept: { code: any; name: any }) => ({
        code: dept.code,
        name: dept.name,
      })),
    );

  const handleFormSubmit = (values: FilterFormValues) => {
    onSubmit(values);
    formRef.current?.reset(defaultFormValues);
  };

  const handleReset = () => {
    formRef.current?.reset(defaultFormValues);
    // Submit with empty departmentCode
    onSubmit({ departmentCode: '' });
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
            options={departments.map(dept => ({
              value: dept.code,
              label: dept.name,
            }))}
            name='departmentCode'
            firstValue={{ value: '', label: 'Chọn phòng ban' }}
            errorString={
              // eslint-disable-next-line @typescript-eslint/no-base-to-string
              methods?.formState?.errors?.departmentCode ? methods?.formState?.errors?.departmentCode?.toString() : ''
            }
            className='mt-2 w-72 rounded-md border px-3 py-3 focus:outline-none'
            maxHeight={200}
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

import { Select } from 'antd';
import { useFormContext } from 'react-hook-form';

import { type IDepartment } from '..';

// eslint-disable-next-line @typescript-eslint/naming-convention
const DepartmentSelect = ({ departments, disabled }: { departments: IDepartment[]; disabled?: boolean }) => {
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const departmentList = watch('departmentList') || [];

  return (
    <Select
      mode='tags'
      size='large'
      placeholder='Chọn phòng ban'
      style={{ width: '100%' }}
      value={departmentList.map((dept: { code: any }) => dept.code)}
      onChange={selectedIds => {
        // Filter departments to get the full objects
        const selectedDepartments = departments.filter((dept: IDepartment) => selectedIds.includes(dept.code ?? ''));
        setValue('departmentList', selectedDepartments); // Store as full objects in the form
      }}
      options={departments.map((dept: IDepartment) => ({
        value: dept.code,
        label: dept.name,
      }))}
      status={errors.departmentList ? 'error' : undefined}
      allowClear
      maxTagCount='responsive'
      disabled={disabled}
    />
  );
};

export default DepartmentSelect;

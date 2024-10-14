import { Checkbox, type ICheckboxProps } from '../../../../components/checkbox';
import TextButton from '../../../../components/textbutton';

interface ISelectCheckboxsProps {
  checkboxStates: Record<string, boolean>;
  onChangeCheckboxs: (value: any) => void;
}
const arrOptions: ICheckboxProps[] = [
  { label: 'STT', checked: true, name: 'stt' },
  { label: 'Mã nhân viên', checked: true, name: 'code' },
  { label: 'Mã chấm công', checked: false, name: 'timekeepingCode' },
  { label: 'Tên nhân viên', checked: true, name: 'fullName' },
  { label: 'Giới tính', checked: true, name: 'gender' },
  { label: 'Chức vụ', checked: true, name: 'position' },
  { label: 'Phòng ban', checked: true, name: 'departmentName' },
  { label: 'Bậc', checked: true, name: 'level' },
  { label: 'BHXH', checked: false, name: 'socialInsuranceCode' },
  { label: 'MST', checked: false, name: 'taxCode' },
  { label: 'SĐT', checked: false, name: 'phoneNumber' },
  { label: 'Trạng thái', checked: true, name: 'status' },
];

export function SelectCheckboxs(props: ISelectCheckboxsProps) {
  const onChangeCheckbox = (name: string, checked: boolean) => {
    const updatedStates = {
      ...props.checkboxStates,
      [name]: checked,
    };
    props.onChangeCheckboxs(updatedStates);
  };

  const handleReset = () => {
    const resetStates = arrOptions.reduce<Record<string, boolean>>((acc, option) => {
      acc[option.name] = option.checked;
      return acc;
    }, {});
    props.onChangeCheckboxs(resetStates);
  };

  const displayedCount = Object.values(props.checkboxStates).filter(Boolean).length;

  return (
    <div
      className='custom-shadow absolute left-1/2 top-[62px] z-50 w-[180px] -translate-x-1/2 transform rounded-lg bg-white px-4 py-2'
      onClick={e => {
        e.stopPropagation();
      }}>
      <div className='absolute left-1/2 top-[-12px] h-0 w-0 -translate-x-1/2 transform'>
        <div className='left-1/2 h-0 w-0 -translate-x-1/2 transform border-b-[10px] border-l-[8px] border-r-[8px] border-b-green-300 border-l-transparent border-r-transparent shadow-lg'></div>
      </div>
      <div>
        <div className='border-b pb-2 text-sm font-normal text-[#0f1e34]'>
          {displayedCount}/{arrOptions.length} được hiển thị
        </div>
        <div className='my-2'>
          {arrOptions.map(item => (
            <Checkbox
              key={item.name}
              onChange={checked => {
                onChangeCheckbox(item.name, checked);
              }}
              checked={props.checkboxStates[item.name]}
              label={item.label}
              name={item.name}
            />
          ))}
        </div>
        <div className='border-t pt-[10px]'>
          <TextButton
            text='Đặt lại'
            className='my-1 inline-flex rounded-md px-4 py-2 text-center text-sm text-[#2db976] hover:cursor-pointer hover:bg-[#f0f0f0]'
            onClick={handleReset}
          />
        </div>
      </div>
    </div>
  );
}

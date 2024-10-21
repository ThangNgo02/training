import { Table } from 'antd';
import { useContext, useRef, useState } from 'react';

import Button from '@/components/button';
import { Header } from '@/components/header';
import IconRoot from '@/components/icon';
import { IconVariable } from '@/components/icon/types';
import { Pagination } from '@/components/pagination';
import { Search } from '@/components/search';
import SelectRoot from '@/components/select';
import { ModalContext } from '@/context/contextStore';
import useClickOutside from '@/hooks/useClickOutside';
import { useDepartments } from '@/hooks/useDepartments';
import { SelectCheckboxs } from '@/pages/listEmployees/components/selectCheckboxs';

import { ModalFilter } from './components/modalFilter';
import { type IColumnsTableProps, type IDataTableType } from './type';

interface IListEmployeesViewProps {
  data: IDataTableType[];
  columns: IColumnsTableProps[];
  currentPage: number;
  totalPages: number;
  checkboxStates: Record<string, boolean>;
  initialValues: any;
  setIsReset?: (valueL: boolean) => void;
  onCheckboxChange: (updatedStates: Record<string, boolean>) => void;
  onChangeRowDisplay: (value: number) => void;
  onPageChange: (newPage: number) => void;
  handleOnChangeSearch: (textSearch: string) => void;
  handleFormFilter: (value: any) => void;
  handleExportStaff: () => Promise<void>;
  setIsOpenModal: (value: boolean) => void;
  setIsUpdateNotAdd: (value: boolean) => void;
}
interface IOptionRowDisplay {
  label: string;
  value: number;
}
const optionsRowDisplay: IOptionRowDisplay[] = [
  { label: '5 Dòng', value: 5 },
  { label: '10 Dòng', value: 10 },
  { label: '20 Dòng', value: 20 },
  { label: '25 Dòng', value: 25 },
  { label: '50 Dòng', value: 50 },
  { label: '100 Dòng', value: 100 },
];

export function ListEmployeesView({
  data,
  columns,
  currentPage,
  totalPages,
  checkboxStates,
  initialValues,
  setIsReset,
  onCheckboxChange,
  onChangeRowDisplay,
  onPageChange,
  handleOnChangeSearch,
  handleFormFilter,
  handleExportStaff,
  setIsOpenModal,
  setIsUpdateNotAdd,
}: IListEmployeesViewProps) {
  const refBtn = useRef(null);
  const refSelectCheckbox = useRef(null);
  useClickOutside(refBtn, () => {
    setIsOpenModalFilter(false);
  });
  useClickOutside(refSelectCheckbox, () => {
    setIsOpenSelectCheckbox(false);
  });

  const [isOpenModalFilter, setIsOpenModalFilter] = useState<boolean>(false);
  const [isOpenSelectCheckbox, setIsOpenSelectCheckbox] = useState<boolean>(false);
  const listDepartments = useDepartments();
  const { handleSetEmployeeDetail } = useContext(ModalContext);
  return (
    <div className='flex h-full flex-col'>
      <>
        <Header
          title='Danh sách nhân viên'
          className='text-2xl font-bold text-[#1A1A1A]'
        />
        <div className='p-3'>
          <div className='flex-col rounded-xl bg-white p-6'>
            <div className='flex items-center justify-between'>
              <Search
                onChangeText={handleOnChangeSearch}
                placeholder='Mã / Tên nhân viên'
                iconStart={<IconRoot icon={IconVariable.search} />}
              />
              <div className='flex items-center gap-4'>
                <Button
                  text='Cột'
                  className='relative flex items-center gap-2 rounded-lg border px-4 py-[10px] hover:border-[#2DB976]'
                  iconStart={<IconRoot icon={IconVariable.setting} />}
                  reff={refSelectCheckbox}
                  onClick={() => {
                    setIsOpenSelectCheckbox(!isOpenSelectCheckbox);
                  }}>
                  {isOpenSelectCheckbox && (
                    <SelectCheckboxs
                      checkboxStates={checkboxStates}
                      onChangeCheckboxs={onCheckboxChange}
                    />
                  )}
                </Button>
                <Button
                  text='Bộ lọc'
                  reff={refBtn}
                  className='relative box-border flex items-center gap-2 rounded-lg border px-4 py-[10px] hover:border-[#2DB976]'
                  iconStart={<IconRoot icon={IconVariable.filter} />}
                  onClick={() => {
                    setIsOpenModalFilter(!isOpenModalFilter);
                  }}>
                  {isOpenModalFilter && (
                    <ModalFilter
                      listDepartment={listDepartments}
                      handleSubmitFormFilter={handleFormFilter}
                      initialValues={initialValues}
                    />
                  )}
                </Button>
                <Button
                  // eslint-disable-next-line @typescript-eslint/no-misused-promises
                  onClick={handleExportStaff}
                  text='Xuất dữ liệu'
                  className='flex items-center gap-2 rounded-lg border px-4 py-[10px] hover:border-[#2DB976]'
                  iconStart={<IconRoot icon={IconVariable.download} />}
                />

                <Button
                  onClick={() => {
                    handleSetEmployeeDetail({});
                    setIsOpenModal(true);
                    setIsUpdateNotAdd(true);
                    if (setIsReset) {
                      setIsReset(true);
                    }
                  }}
                  className='flex items-center rounded-lg border bg-[#2DB976] px-4 py-[10px] text-white hover:border-[#2DB976]'
                  text='Thêm mới'
                  iconStart={<IconRoot icon={IconVariable.plus} />}
                />
              </div>
            </div>
            <div className='mt-5 flex items-center justify-end gap-4'>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
              />
              <SelectRoot
                name='size'
                options={optionsRowDisplay}
                firstValue={optionsRowDisplay[3]}
                onChange={onChangeRowDisplay}
                className='gap-[10px] rounded-md border px-4 py-2 text-center'
                classNameItemSelect='text-center'
              />
            </div>
            <Table<IDataTableType>
              columns={columns}
              dataSource={data}
              scroll={{ x: 1000 }}
              className='custom-table mt-5 '
              pagination={false}
              size='small'
              bordered
              rowKey='code'
            />
          </div>
        </div>
      </>
    </div>
  );
}

import { type IOption } from '@/components/select';

export interface IModalAddEmployeeProps {
  setIsLoading: (value: boolean) => void;
  setIsOpenModalAdd: (value: boolean) => void;
  listDepartment: IOption[];
}

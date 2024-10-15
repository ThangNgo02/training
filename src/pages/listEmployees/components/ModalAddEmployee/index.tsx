import { type IModalAddEmployeeProps } from './type';
import { ModalAddEmployeeView } from './view';

export function ModalAddEmployee({ setIsLoading, setIsOpenModalAdd, listDepartment }: IModalAddEmployeeProps) {
  return (
    <ModalAddEmployeeView
      setIsLoading={setIsLoading}
      setIsOpenModalAdd={setIsOpenModalAdd}
      listDepartment={listDepartment}
    />
  );
}

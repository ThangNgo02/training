import { type IModalEditEmployeeProps } from './type';
import { ModalEditEmployeeView } from './view';

export function ModalEditEmployee({ setIsLoading, setIsOpenModalEdit, employeeIdSelected }: IModalEditEmployeeProps) {
  return (
    <ModalEditEmployeeView
      setIsLoading={setIsLoading}
      setIsOpenModalEdit={setIsOpenModalEdit}
      employeeIdSelected={employeeIdSelected}
    />
  );
}

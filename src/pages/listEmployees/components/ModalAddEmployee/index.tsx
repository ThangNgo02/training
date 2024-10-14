import { type IModalAddEmployeeProps } from './type';
import { ModalAddEmployeeView } from './view';

export function ModalAddEmployee({ setIsLoading, setIsOpenModalAdd }: IModalAddEmployeeProps) {
  return (
    <ModalAddEmployeeView
      setIsLoading={setIsLoading}
      setIsOpenModalAdd={setIsOpenModalAdd}
    />
  );
}

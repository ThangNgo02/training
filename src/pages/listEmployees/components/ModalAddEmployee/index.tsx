import { type UploadFile } from 'antd';
import { useEffect, useState } from 'react';

import { type IApiRequest } from '@/api/api.interface';
import { useRequest } from '@/api/api.middleware';
import toastDefault, { EnumToast } from '@/components/toast';
import Config from '@/env';

import { type IAddNewEmployeeDataType, type IModalAddEmployeeProps } from './type';
import { ModalAddEmployeeView } from './view';

export function ModalAddEmployee({ setIsOpenModalAdd, listDepartment, setIsLoading }: IModalAddEmployeeProps) {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const config = Config.getInstance().getState();

  const handleResponseUpload = {
    handleRequestSuccess: (response: any) => {
      try {
        if (response.code === 2000) {
          toastDefault(EnumToast.SUCCESS, 'Upload thành công');
        }
      } catch (error: any) {
        toastDefault(EnumToast.ERROR, 'Upload thất bại. ', error);
      }
    },
    handleRequestFailed: (response: any) => {
      toastDefault(EnumToast.ERROR, 'Lỗi khi gửi yêu cầu. ', response.code);
    },
  };

  const addNewEmployeeApi: IApiRequest = {
    url: `${config.api.host}${config.api.apiPath.addNewEmployee}`,
    method: 'post',
    headers: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('tokenLogin')}`,
    },
  };
  const [idEmployee, setIdEmployee] = useState();
  const uploadApi: IApiRequest = {
    url: `${config.api.host}${config.api.apiPath.addNewEmployee}/${idEmployee}`,
    method: 'post',
    headers: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${localStorage.getItem('tokenLogin')}`,
    },
  };
  const { mutate: mutateUpload } = useRequest(uploadApi, handleResponseUpload);
  useEffect(() => {
    if (idEmployee) {
      const formData = new FormData();
      for (const file of fileList) {
        if (file.originFileObj) {
          formData.append('file', file.originFileObj);
        }
      }
      mutateUpload(formData);
    }
  }, [idEmployee]);

  const handleResponseNewEmployee = {
    handleRequestSuccess: (response: any) => {
      try {
        setIsLoading && setIsLoading(true);
        if (response.code === 2000) {
          setIdEmployee(response.data.id);
          toastDefault(EnumToast.SUCCESS, 'Thêm nhân viên mới thành công');
          setIsOpenModalAdd(false);
        }
      } catch (error: any) {
        toastDefault(EnumToast.ERROR, 'Thêm nhân viên mới thất bại. ', error);
      } finally {
        setIsLoading && setIsLoading(false);
      }
    },
    handleRequestFailed: (response: any) => {
      toastDefault(EnumToast.ERROR, 'Lỗi khi gửi yêu cầu. ', response.code);
    },
  };

  const { mutate: mutateAddNewEmployee } = useRequest(addNewEmployeeApi, handleResponseNewEmployee);
  const handleAddNewEmployee = (data: IAddNewEmployeeDataType) => {
    mutateAddNewEmployee({ ...data });
  };
  return (
    <ModalAddEmployeeView
      handleSubmit={handleAddNewEmployee}
      setIsOpenModalAdd={setIsOpenModalAdd}
      listDepartment={listDepartment}
      fileList={fileList}
      setFileList={setFileList}
    />
  );
}

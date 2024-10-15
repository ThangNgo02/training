import { type UploadFile } from 'antd';

import { type IOption } from '@/components/select';

export interface IModalAddEmployeeProps {
  setIsOpenModalAdd: (value: boolean) => void;
  listDepartment: IOption[];
  handleSubmit?: (data: any) => void;
  setIsLoading?: (value: boolean) => void;
  fileList?: UploadFile[];
  setFileList?: (files: UploadFile[]) => void;
}

export interface IAddNewEmployeeDataType {
  code: string;
  fullName: string;
  position?: string;
  departmentCode: string;
  staffMetaDataLevel?: string;
  email?: string;
  note?: string;
  birthDate?: string;
  gender: string;
  socialInsuranceCode?: string;
  taxCode?: string;
  identityCard?: string;
  issueDateIdentityCard?: string;
  issuePlaceIdentityCard?: string;
  permanentAddress?: string;
  temporaryAddress?: string;
  hireDate?: string;
  resignDate?: string;
  isResigned?: string;
}

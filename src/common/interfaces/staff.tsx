import { type IDepartment } from './department';

export interface IStaff {
  id: number;
  tenantId: number;
  dateCreated: string;
  lastUpdated: string;
  modifiedBy: string;
  createdBy: string;
  code: string;
  timekeepingCode: any;
  fullName: string;
  gender: string;
  birthDate: string;
  department: IDepartment;
  position: string;
  socialInsuranceCode: any;
  taxCode: any;
  phoneNumber: any;
  email: any;
  identityCard: any;
  issueDateIdentityCard: any;
  issuePlaceIdentityCard: any;
  permanentAddress: any;
  temporaryAddress: any;
  hireDate: any;
  isResigned: boolean;
  resignDate: any;
  note: any;
  status: string;
  staffMetaDataLevel: any;
  staffMetaDataFiles: any[];
  avatarPath: any;
}

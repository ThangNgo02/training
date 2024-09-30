export interface IDepartment {
  id: number;
  tenantId: number;
  dateCreated: string;
  lastUpdated: string;
  modifiedBy: string;
  createdBy: string;
  code: string;
  name: string;
  note: any;
  active: boolean;
  phoneNumber: any;
  blockForTimesheet: string;
}

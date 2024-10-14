export interface IDataTableType {
  id: number | null;
  code: string | null;
  timekeepingCode: string | null;
  fullName: string | null;
  gender: string | null;
  position: string | null;
  departmentName: string | null;
  level: string | null;
  socialInsuranceCode: string | null;
  taxCode: string | null;
  phoneNumber?: string | null;
  status: string | null;
}
export interface IColumnsTableProps {
  title: string;
  dataIndex: string;
  key: string;
  render?: (text: any, data: any, index: number) => React.ReactNode;
  width?: number | string;
}

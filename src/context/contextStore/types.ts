export interface IModalContextParamsOnSetView {
  data: any;
}

export interface IModalContext {
  data: any;
  detailEmployee: any;
  handleSetEmployeeDetail: (data: any) => void;
}

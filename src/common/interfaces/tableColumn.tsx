export type Side = 'left' | 'right';

export interface ITableColumns {
  key: string;
  name?: string;
  title?: JSX.Element;
  width?: number;
  isHiddenHeader?: boolean;
  isHiddenColumn?: boolean;
  isLocalized?: boolean;
  fixed?: Side;
  render?: (values: any, index: number) => JSX.Element;
  onClick?: (values: any, index: number) => any;
}

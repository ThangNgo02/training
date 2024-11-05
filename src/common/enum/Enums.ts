export enum EnumPath {
  home = '/',
  login = '/login',
  register = '/register',
  forgotPassword = '/forgot-password',
  employee = '/employee-list',
  resetPassword = '/reset-password',
  contact = '/contact'
}

export enum EnumRole {}

export enum EnumGender {}

export enum EnumStatus {}

export type IAuthProfile = Record<string, any>;

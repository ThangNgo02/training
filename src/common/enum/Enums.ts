export enum EnumPath {
  home = '/',
  login = '/login',
  forgotPassword = '/forgot-password',
  resetPassword = '/reset-password',
  listEmployees = '/employees',
  contracts = '/contracts',
  help = '/help',
  contact = '/contact',
}

export enum EnumRole {}

export enum EnumGender {}

export enum EnumStatus {}

export type IAuthProfile = Record<string, any>;

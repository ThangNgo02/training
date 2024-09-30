export enum EnumPath {
  home = '/',
  login = '/login',
  signup = '/signup',
  profile = '/profile',
  list = '/list',
}

export enum EnumApiPath {
  login = 'account/auth/login',
  staff = 'hrm/staff-meta-data',
}

export enum EnumRole {}

export enum EnumGender {}

export enum EnumStatus {}

export type IAuthProfile = Record<string, any>;

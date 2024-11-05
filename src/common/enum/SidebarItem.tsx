import React from 'react';

import { EnumPath } from '@/common/enum/Enums';
import IconRoot from '@/components/icon';
import { IconVariable } from '@/components/icon/types';

export interface ISidebarItem {
  id: number;
  name: string;
  icon: React.ReactElement;
  route: string;
}

export const sidebarItems: ISidebarItem[] = [
  {
    id: 0,
    name: 'Trang chủ',
    icon: <IconRoot icon={IconVariable.briefcase} />,
    route: EnumPath.home,
  },
  {
    id: 1,
    name: 'Danh sách nhân viên',
    icon: <IconRoot icon={IconVariable.briefcase} />,
    route: EnumPath.employee,
  },
  {
    id: 2,
    name: 'Hợp đồng',
    icon: <IconRoot icon={IconVariable.briefcase} />,
    route: EnumPath.contact,
  },
];

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
    route: '/',
  },
  {
    id: 1,
    name: 'Danh sách nhân viên',
    icon: <IconRoot icon={IconVariable.briefcase} />,
    route: '/employee-list',
  },
  {
    id: 2,
    name: 'Hợp đồng',
    icon: <IconRoot icon={IconVariable.briefcase} />,
    route: '/contracts',
  },
];

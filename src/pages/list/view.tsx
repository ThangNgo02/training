import { type ITableColumns } from '@/common/interfaces/tableColumn';
import CardRoot from '@/components/atoms/cardRoot';
import { TableRoot } from '@/components/atoms/tableRoot';

interface IEmployeeListViewProps {
  data: any[];
  columns: ITableColumns[];
  name: string;
}

function EmployeeListView({ name, data, columns }: IEmployeeListViewProps) {
  return (
    <CardRoot>
      <TableRoot
        data={data}
        columns={columns}
        name={name}
      />
    </CardRoot>
  );
}

export default EmployeeListView;

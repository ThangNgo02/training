import React from "react";

export interface IStaff {
  id: string;
  code: string;
  fullName: string;
  username: string;
  email: string;
  phoneNumber: string;
  roles: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface StaffListViewProps {
  data: IStaff[];
  isLoading: boolean;
  handleReload: () => void;
  handleLogOut: () => void;
}

const View: React.FC<StaffListViewProps> = ({
  data,
  isLoading,
  handleReload,
  handleLogOut
}) => {
  return (
    <div className="p-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Danh sách nhân viên</h2>
        <div className="space-x-4">
          <button
            onClick={handleReload}
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Tải lại
          </button>
          <button onClick={handleLogOut} className="cursor-pointer bg-white hover:bg-red-600/20 px-4 py-2 rounded-md">Đăng xuất</button>
        </div>
      </div>

      {isLoading ? (
        <p>Đang tải dữ liệu...</p>
      ) : (
        <div className="overflow-auto">
          <table className="w-full border border-gray-300">
            <thead className="bg-gray-200 text-left">
              <tr>
                <th className="p-2">#</th>
                <th className="p-2">Mã NV</th>
                <th className="p-2">Họ tên</th>
                <th className="p-2">Username</th>
                <th className="p-2">Email</th>
                <th className="p-2">SĐT</th>
                <th className="p-2">Roles</th>
                <th className="p-2">Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {data.map((staff, index) => (
                <tr key={staff.id} className="border-t border-gray-200">
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2">{staff.code}</td>
                  <td className="p-2">{staff.fullName}</td>
                  <td className="p-2">{staff.username}</td>
                  <td className="p-2">{staff.email || "-"}</td>
                  <td className="p-2">{staff.phoneNumber || "-"}</td>
                  <td className="p-2">
                    {staff.roles ? staff.roles.split(",").join(", ") : "-"}
                  </td>
                  {staff.status == "ACTIVE" ? (
                    <td className="p-2 text-center text-green-400">
                      {staff.status}
                    </td>
                  ) : (
                    <td className="p-2 text-center text-red-400">
                      {staff.status}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default View;

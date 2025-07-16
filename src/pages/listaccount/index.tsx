import React, { useEffect, useState } from "react";
import View, { IStaff } from "@/pages/listaccount/view";
import { type IApiRequest } from "@/api/api.interface";
import AuthService from "@/utils/Auth";
import { LoggerService } from "@/utils/Logger";
import { useRequest } from "@/api/api.middleware";
import { useNavigate } from "react-router-dom";

const StaffListPage: React.FC = () => {
  const [staffs, setStaffs] = useState<IStaff[]>([]);
  const [data, setData] = useState<any>();

  const auth = AuthService.getPackageAuth();

  const navigate = useNavigate();

  const exampleApi: IApiRequest = {
    headers: auth ? { Authorization: `Bearer ${auth}` } : {},
    url: "https://api.tsp.com.vn/core/staffs?page=0&size=25&username=",
    method: "get",
  };

  const funcRequest = {
    handleRequestSuccess: (data: any) => {
      try {
        setData(data);
        setStaffs(data.data || []);
        LoggerService.debug(
          "StaffListPage: handleRequestSuccess received data",
          data,
        );
      } catch (error: any) {
        LoggerService.error("StaffListPage: parse data error", error);
      }
    },
  };

  const { isLoading, mutate } = useRequest(exampleApi, funcRequest);

  useEffect(() => {
    mutate({});
  }, []);

  const handleLogOut = () => {
    AuthService.handleLogout();

    navigate("/login");
  };  

  return (
    <View data={staffs} isLoading={isLoading} handleLogOut={handleLogOut} handleReload={() => mutate({})} />
  );
};

export default StaffListPage;

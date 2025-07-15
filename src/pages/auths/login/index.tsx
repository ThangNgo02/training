import React, { useState } from "react";
import LoginView from "./view";
import Config from "@/env";
import AuthService from "@/utils/Auth";
import { type IApiRequest } from "@/api/api.interface";
import { LoggerService } from "@/utils/Logger";
import { useLogin, useRequest } from "@/api/api.middleware";

const LoginIndex = () => {
  const config = new Config().getState();
  const auth = AuthService.getPackageAuth();
  const exampleApi: IApiRequest = {
    url: "https://api.tsp.com.vn/account/auth/login",
    method: "post",
    headers: { "Content-Type": "application/json" },
    callbackWhenError: () => console.error("Login failed!"),
  };

  const [data, setData] = useState<any>();

  const funcRequest = {
    2000: (data: any) => {
      const token = data?.result?.accessToken;
      if (token) {
        // localStorage.setItem("accessToken", token);
        // console.log("Login success: token stored!");
        console.log(token);
      }
    },
  };

  // const { isLoading, mutate } = useLogin(exampleApi, funcRequest);

  const { isLoading, mutate: login } = useLogin(exampleApi, funcRequest);

  const handleCallApi = (payload: any) => {
    login(payload);
    console.log(payload);
  };

  return <LoginView isLoading={isLoading} handleCallApi={handleCallApi} />;
};

export default LoginIndex;

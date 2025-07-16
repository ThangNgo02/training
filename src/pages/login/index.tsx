import { useState } from "react";

import { type IApiRequest } from "@/api/api.interface";
import { useLogin, useRequest } from "@/api/api.middleware";
import Config from "@/env";
import AuthService, { IAuth } from "@/utils/Auth";
import { LoggerService } from "@/utils/Logger";

import LoginView from "./view";

import { useNavigate } from "react-router-dom";

function LoginIndex() {
  const config = new Config().getState();
  const auth = AuthService.getPackageAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [apiError, setApiError] = useState<string | undefined>();
  const [errorEmail, setErrorEmail] = useState<string | undefined>();
  const [errorPassword, setErrorPassword] = useState<string | undefined>();

  const exampleApi: IApiRequest = {
    headers: { token: auth?.token },
    url: "https://api.tsp.com.vn/account/auth/login",
    method: "post",
  };

  const navigate = useNavigate();

  const funcRequest = {
    handleRequestSuccess: (data: any) => {
      try {
        const now = Date.now();
        const oneDay = 24 * 60 * 60 * 1000;

        if (data) {
          const authData = {
            token: data.accessToken,
            // expireAt: now + oneDay,
            // refreshAt: now + oneDay,
            // profileDetails: data.user,
          };

          // AuthService.setAllPackage(authData, data.user);

          AuthService.setPackageAuth(authData.token, oneDay + now);

          const dataAuthService = AuthService.getPackageAuth();

          document.cookie = `token=${data.accessToken}; path=/; max-age=86400`;

          if (dataAuthService) {
            navigate("/list-account");
          }
        }
        // LoggerService.debug("LoginIndex: handleRequestSuccess", data);
        setApiError(undefined);
      } catch (error: any) {
        LoggerService.error("LoginIndex: handleRequestSuccess error", error);
      }
    },
    handleRequestError: (error: any) => {
      LoggerService.error("LoginIndex: handleRequestError", error);
      setApiError("Đăng nhập thất bại. Vui lòng thử lại.");
    },
  };

  const { isLoading, mutate } = useLogin(exampleApi, funcRequest);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setErrorEmail(undefined);
    setErrorPassword(undefined);
    setApiError(undefined);

    let hasError = false;
    if (!email) {
      setErrorEmail("Vui lòng nhập tên đăng nhập");
      hasError = true;
    }
    if (!password) {
      setErrorPassword("Vui lòng nhập mật khẩu");
      hasError = true;
    }

    if (hasError) return;

    mutate({
      username: email,
      password: password,
      tenant: "ebst",
    });
  };

  return (
    <LoginView
      isLoading={isLoading}
      handleSubmit={handleSubmit}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      errorEmail={errorEmail}
      errorPassword={errorPassword}
      apiError={apiError}
    />
  );
}

export default LoginIndex;

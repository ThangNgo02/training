import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";

import React, { useState } from "react";

interface ILoginView {
  isLoading: boolean;
  handleCallApi: (params: any) => void;
  data?: any;
}

const LoginView = ({ isLoading, handleCallApi }: ILoginView) => {
  const [companyName, setCompanyName] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const clearAllField = () => {
    setCompanyName("");
    setUserName("");
    setPassword("");
  };

  const handleRegister = () => {
    const payload = {
      tenant: companyName,
      username: userName,
      password: password,
    };

    handleCallApi(payload);

    clearAllField();
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-r from-[#478BD6] to-[#25D8D3]">
      <div className="min-w-[450px] max-w-4xl rounded-lg bg-white p-5">
        <div className="flex h-[80px] w-full items-center justify-center">
          <img
            src="https://ops.tsp.com.vn/logo-ebst.png"
            alt="imgae logo"
            className="h-full w-[50%] object-contain"
          />
        </div>
        <form className="flex flex-col gap-3">
          <Input
            label="Công ty"
            placeholder="Nhập tên công ty"
            value={companyName}
            setValue={(e) => setCompanyName(e.target.value)}
          />
          <Input
            label="Tên đăng nhập"
            placeholder="Nhập tên đăng nhập"
            value={userName}
            setValue={(e) => setUserName(e.target.value)}
          />
          <Input
            label="Mật khẩu"
            placeholder="Nhập mật khẩu"
            type="password"
            value={password}
            setValue={(e) => setPassword(e.target.value)}
          />

          <div className="mt-3 flex items-center justify-center">
            <Button
              modifiers={["secondary", "h60-pk3"]}
              isLoading={false}
              disabled={false}
              onClick={(e) => {
                e.preventDefault();
                handleRegister();
              }}
              type="submit"
            >
              Đăng nhập
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginView;

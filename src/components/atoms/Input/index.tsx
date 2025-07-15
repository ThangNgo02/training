import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

import "./index.scss";

type Sizes = "h60" | "h60-pk3";
// type Variant = "primary" | "secondary" | "green" | "iconButton";
interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  isLoading?: boolean;
  label?: string;
  value?: string | number;
  placeholder?: string;
  type?: string;
  id?: string;
  isDisable?: boolean;
  setValue?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<IInputProps> = ({
  label,
  value,
  placeholder,
  type,
  id,
  setValue,
  ...props
}) => {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

  const toggleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  return (
    <div className=" w-full">
      <label htmlFor={id} className="text-sm font-normal">
        {label}
      </label>

      <div className="relative mt-1 w-full">
        <input
          type={
            type == "password" ? (isShowPassword ? "text" : "password") : type
          }
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={setValue}
          className="w-full rounded-lg border border-gray-200 px-4 py-2 text-sm outline-none"
        />
      </div>
    </div>
  );
};

export default Input;

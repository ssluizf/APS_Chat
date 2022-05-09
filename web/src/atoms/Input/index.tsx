import React, { useState } from "react";
import { HiEye } from "react-icons/hi";
import { HiEyeOff } from "react-icons/hi";

type InputProps = {
  cfg: {
    name: string;
    type: string;
    autoComplete: string;
    placeholder: string;
    register: object;
  };
  field: {
    value: string;
  };
  errors: any;
};

const Input: React.FC<InputProps> = ({ cfg, field, errors }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const toggleVisibility = () => setPasswordVisible(!passwordVisible);

  const checkIfPasswordIsVisible = (type: string) => {
    if (type === "password") return passwordVisible ? "text" : type;
    return type;
  };

  return (
    <div className="mb-4">
      <div className="flex items-center w-full bg-slate-200 rounded-md">
        <input
          className="w-full placeholder-stone-600 bg-transparent my-3 mx-4 focus:outline-none"
          name={cfg.name}
          type={checkIfPasswordIsVisible(cfg.type)}
          autoComplete={cfg.autoComplete}
          placeholder={cfg.placeholder}
          value={field.value || ""}
          {...cfg.register}
        />
        {cfg.type === "password" && (
          <button className="mx-4 text-black text-xl" onClick={toggleVisibility}>
            {passwordVisible ? <HiEye /> : <HiEyeOff />}
          </button>
        )}
      </div>
      {errors?.[cfg.name] && <span className="text-red-600">{errors?.[cfg.name]?.message}</span>}
    </div>
  );
};

export default Input;

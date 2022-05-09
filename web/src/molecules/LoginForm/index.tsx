import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import clientWithoutToken from "../../providers/clientWithoutToken";

import { configTextField, schema } from "./config";
import Input from "../../atoms/Input";
import Button from "../../atoms/Button";

const LoginForm: React.FC = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  configTextField.map((conf) => (conf.register = { ...register(conf.name) }));

  const submitForm = handleSubmit(async ({ email, password }) => {
    await clientWithoutToken
      .post("/auth/user", {
        email,
        password,
      })
      .then(async (response: any) => {
        const token = response.data.token;
        localStorage.setItem("token", token);

        navigate("/");
      })
      .catch((err: any) => {});
  });

  return (
    <form
      onSubmit={submitForm}
      className="flex flex-col items-center justify-center mb-auto
  bg-slate-50 w-1/2 border border-gray-300 rounded-lg shadow-sm"
    >
      <div className="w-3/4 mt-14 mb-8">
        {configTextField.map((cfg, index) => (
          <Controller
            key={`input-${index}`}
            name={cfg.name}
            control={control}
            render={({ field }) => (
              <Input cfg={cfg} field={field} errors={errors} />
            )}
          />
        ))}
      </div>
      <Button>ENTRAR</Button>
    </form>
  );
};

export default LoginForm;

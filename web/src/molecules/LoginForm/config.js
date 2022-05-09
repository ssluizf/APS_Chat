import * as yup from "yup";

export const schema = yup.object({
  email: yup.string().required("Campo obrigatório"),
  password: yup.string().required("Campo obrigatório"),
}).required();

export const configTextField = [
  {autoComplete:'email', name:'email', placeholder: 'Seu e-mail', type: 'email', register:{}},
  {autoComplete:'current-password', name:'password', placeholder: 'Senha', type: 'password', register:{}},
]
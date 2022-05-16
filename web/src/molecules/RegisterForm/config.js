import * as yup from "yup";

export const schema = yup.object({
  name: yup.string().required("Campo obrigatório"),
  email: yup.string().required("Campo obrigatório"),
  password: 
    yup
      .string()
      .min(6, "Senha precisa conter no mínimo 6 caracteres")
      .required("Campo obrigatório"),
  confirmPassword: 
    yup
      .string()
      .required("Campo obrigatório")
      .oneOf([yup.ref('password'), null], 'As senhas não conferem')
,
}).required();

export const configTextField = [
  {autoComplete:'name', name:'name', placeholder: 'Seu nome', type: 'name', register:{}},
  {autoComplete:'email', name:'email', placeholder: 'Seu e-mail', type: 'email', register:{}},
  {autoComplete:'new-password', name:'password', placeholder: 'Senha', type: 'password', register:{}},
  {autoComplete:'off', name:'confirmPassword', placeholder: 'Confirmar Senha', type: 'password', register:{}},
]
import * as yup from 'yup'
import { yupValidations } from '@/constants/validations'

const { msgRequired, msgIsEmail, msgNumber } = yupValidations

export const SignInYupSchema = yup.object().shape({
  email: yup.string().required(msgRequired).email(msgIsEmail),
  password: yup.string().required(msgRequired),
})

export const RecoverYupSchema = yup.object().shape({
  email: yup.string().required(msgRequired).email(msgIsEmail),
})

export const TokenYupSchema = yup.object().shape({
  token: yup.number().typeError(msgNumber).required(msgRequired),
})

export const CreatePasswordYupSchema = yup.object().shape({
  password: yup
    .string()
    .required(msgRequired)
    .min(8, 'La contraseña requiere al menos 8 caracteres')
    .max(40, 'La contraseña no debe exceder los 40 caracteres'),
  passwordConfirm: yup.string().required(msgRequired),
})

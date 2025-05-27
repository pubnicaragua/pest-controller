import * as yup from 'yup'

import { yupValidations } from '@/constants/validations'

const { msgRequired, msgNumber, msgIsEmail } = yupValidations

export const UpdateProfileSchema = yup.object().shape({
  name: yup.string().required(msgRequired),
  lastname: yup.string().required(msgRequired),
  phoneNumber: yup.number().typeError(msgNumber).required(msgRequired),
  email: yup.string().required(msgRequired).email(msgIsEmail),
  region: yup.string().required(msgRequired),
  commune: yup.string().required(msgRequired),
  rut: yup.string().required(msgRequired),
  address: yup.string().required(msgRequired),
})

import * as yup from 'yup'

import { yupValidations } from '@/constants/validations'

const { msgRequired, msgNumber, msgIsEmail } = yupValidations

export const RegisterClientSchema = yup.object().shape({
  rut: yup.string().required(msgRequired),
  region: yup.string().required(msgRequired),
  commune: yup.string().required(msgRequired),
  address: yup.string().required(msgRequired),
  businessName: yup.string().required(msgRequired),
  contact: yup.string().required(msgRequired),
  phoneNumber: yup.number().typeError(msgNumber),
  email: yup.string().email(msgIsEmail),
})

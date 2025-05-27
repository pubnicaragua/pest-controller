import * as yup from 'yup'

import { yupValidations } from '@/constants/validations'

const { msgRequired, msgNumber, msgDate } = yupValidations

export const ScheduleServiceSchema = yup.object().shape({
  clientId: yup.string().required(msgRequired),
  address: yup.string().required(msgRequired),
  serviceType: yup.string().required(msgRequired),
  urgency: yup.string().required(msgRequired),
  needVisit: yup.string().required(msgRequired),
  visitDate: yup.date().when('needVisit', {
    is: 'SI',
    then: schema => schema.required(msgRequired),
  }),
  serviceDate: yup.date().typeError(msgDate).required(msgRequired),
  technicalId: yup.string(),
  observations: yup.string(),
  budget: yup.number().typeError(msgNumber),
  serviceTypeOther: yup.string().when('serviceType', {
    is: 'Otro',
    then: schema => schema.required(msgRequired),
  }),
})

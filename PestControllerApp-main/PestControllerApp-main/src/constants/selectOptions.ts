import { User } from '@/api/users/type'
import { ServiceStatusConst, ServiceTypesConst, ServiceUrgencyConst } from './services'
import { Client } from '@/api/client/type'
import { capitalizeString } from '@/libs/strings'
import { ServiceStatusTranslate, ServiceTypes, ServiceUrgencyTranlate } from '@/api/services/type'

export const needVisitOptions = () => {
  return [
    { value: 'SI', label: 'SI' },
    { value: 'NO', label: 'NO' },
  ]
}

export const serviceTypeOptions = () => {
  return ServiceTypesConst.map(type => ({
    value: type,
    label: capitalizeString(type),
  }))
}

export const serviceUrgencyOptions = () => {
  return ServiceUrgencyConst.map(urgency => ({
    value: urgency,
    label: capitalizeString(ServiceUrgencyTranlate[urgency]),
  }))
}

export const serviceStatusOptions = () => {
  return ServiceStatusConst.map(status => ({
    value: status,
    label: capitalizeString(ServiceStatusTranslate[status]),
  }))
}

export const technicalOptions = (technicals: User[]) => {
  return technicals?.map(tech => ({
    value: tech._id,
    label: `${tech.name} ${tech.lastname}`,
  }))
}

export const clientOptions = (clients: Client[]) => {
  return clients?.map(client => ({ value: client._id, label: client.businessName }))
}

export const pestTypeOptions = () => {
  return [{ value: ServiceTypes.DESRATIZACIÓN, label: 'Roedores' }]
}

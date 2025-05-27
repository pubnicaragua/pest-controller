import { ServiceStatus, ServiceTypes, ServiceUrgency } from './service.schema'

export type ScheduleServiceDTO = {
  clientId: string
  address: string
  serviceType: ServiceTypes | string
  urgency: ServiceUrgency
  needVisit: boolean
  visitDate: Date
  serviceDate: Date
  technicalId?: string
  observations?: string
  budget?: number
}

export type UpdateServiceDTO = {
  clientId: string
  address: string
  serviceType: ServiceTypes | string
  urgency: ServiceUrgency
  needVisit: boolean
  visitDate: Date
  serviceDate: Date
  technicalId?: string
  observations?: string
  budget?: number
  status?: ServiceStatus
}

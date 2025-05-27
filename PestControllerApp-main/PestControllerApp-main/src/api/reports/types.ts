import { ServiceTypes } from '../services/type'

export type Reports = {
  services: ServiceReport[]
  clients: ClientReport[]
}

export type ServiceReport = {
  _id: { serviceType: ServiceTypes | string }
  count: number
}

export type ClientReport = {
  _id: string
  businessName: string
  totalServices: number
}

export type PestsReport = {
  _id: string
  clientId: string
  clientName: string
  serviceType: ServiceTypes
  serviceId: string
  serviceDate: Date
  sites: string
  total: number
}

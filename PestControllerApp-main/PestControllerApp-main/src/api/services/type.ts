import { Client } from '../client/type'
import { User } from '../users/type'

export type Service = {
  _id: string
  clientId: Client
  address: string
  serviceType: ServiceTypes
  urgency: ServiceUrgency
  needVisit: boolean
  visitDate: Date
  serviceDate: Date
  startTime?: Date
  finishTime?: Date
  status: ServiceStatus
  technicalId?: User
  observations?: string
  budget?: number
  geolocation?: { lat: number; lng: number }
  createdAt: Date
}

export type ServiceProducts = {
  _id: string
  serviceType: ServiceTypes
  products: Product[]
  createdAt: Date
}

export type Product = {
  _id: string
  name: string
  description: string
  risp: string
}

export type ProductPayload = {
  serviceType: ServiceTypes
  product: {
    name: string
    description: string
    risp: string
  }
}

export type ServiceDevices = {
  _id: string
  type: ServiceTypes
  devices: Device[]
  createdAt: Date
}

export type Device = string[]

export enum ServiceTypes {
  'DESRATIZACIÓN' = 'DESRATIZACIÓN',
  'DESINFECCIÓN' = 'DESINFECCIÓN',
  'DESINSECTACIÓN' = 'DESINSECTACIÓN',
  'PERSONALIZADO' = 'PERSONALIZADO',
}

export enum ServiceUrgency {
  'HIGH' = 'HIGH',
  'MEDIUM' = 'MEDIUM',
  'LOW' = 'LOW',
}

export enum ServiceUrgencyTranlate {
  'HIGH' = 'ALTA',
  'MEDIUM' = 'MEDIA',
  'LOW' = 'BAJA',
}

export enum ServiceStatus {
  'PENDING' = 'PENDING',
  'OVERDUE' = 'OVERDUE',
  'IN PROGRESS' = 'IN PROGRESS',
  'DONE' = 'DONE',
}

export enum ServiceStatusTranslate {
  'PENDING' = 'PENDIENTE',
  'OVERDUE' = 'VENCIDO',
  'IN PROGRESS' = 'EN PROGRESO',
  'DONE' = 'REALIZADO',
}

export type ScheduleServicePayload = {
  clientId: string
  address: string
  serviceType: ServiceTypes
  urgency: ServiceUrgency
  needVisit: boolean
  visitDate: Date
  serviceDate: Date
  techicalId?: string
  observations?: string
  budget?: number
}

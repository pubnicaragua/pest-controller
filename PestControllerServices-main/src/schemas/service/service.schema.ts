import mongoose, { ObjectId } from 'mongoose'
import { User } from '../users/users.schema'
import { Client } from '../client/client.schema'

export enum ServiceTypes {
  'DESRATIZACIÓN' = 'DESRATIZACIÓN',
  'DESINFECCIÓN' = 'DESINFECCIÓN',
  'DESINSECTACIÓN' = 'DESINSECTACIÓN',
}

export enum ServiceUrgency {
  'HIGH' = 'HIGH',
  'MEDIUM' = 'MEDIUM',
  'LOW' = 'LOW',
}

export enum ServiceStatus {
  'PENDING' = 'PENDING',
  'OVERDUE' = 'OVERDUE',
  'IN PROGRESS' = 'IN PROGRESS',
  'DONE' = 'DONE',
}

export type Service = {
  _id: string
  clientId: Client
  address: string
  serviceType: ServiceTypes | string
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

const ServiceSchema = new mongoose.Schema<Service>({
  clientId: { type: mongoose.Types.ObjectId, ref: 'Client', required: true },
  address: { type: String, required: true },
  serviceType: { type: String, required: true },
  startTime: { type: String, required: false },
  finishTime: { type: String, required: false },
  urgency: { type: String, enum: ServiceUrgency, required: true },
  needVisit: { type: Boolean, required: true },
  visitDate: { type: Date, required: true },
  serviceDate: { type: Date, required: true },
  status: { type: String, enum: ServiceStatus, required: true, default: ServiceStatus.PENDING },
  technicalId: { type: mongoose.Types.ObjectId, ref: 'User', required: false },
  observations: { type: String, required: false },
  budget: { type: Number, required: false },
  geolocation: { type: { lat: Number, lng: Number }, required: false },
  createdAt: { type: Date, required: true, default: Date.now },
})

export const ServiceModel = mongoose.model('Service', ServiceSchema)

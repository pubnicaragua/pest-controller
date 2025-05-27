import mongoose, { ObjectId, Schema } from 'mongoose'
import { ServiceTypes } from '../service/service.schema'

type ServiceDevice = {
  _id: ObjectId
  type: ServiceTypes
  devices?: string[]
}

const ServiceDeviceSchema = new mongoose.Schema<ServiceDevice>({
  type: { type: String, enum: ServiceTypes, required: true },
  devices: { type: [String], required: true },
})

export const ServiceDeviceModel = mongoose.model('ServiceDevice', ServiceDeviceSchema)

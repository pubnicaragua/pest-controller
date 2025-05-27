import mongoose, { ObjectId, Schema } from 'mongoose'
import { Service, ServiceTypes } from '../service/service.schema'
import { Client } from '../client/client.schema'

type ServiceDataUpload = {
  _id: ObjectId
  serviceType: ServiceTypes | string
  serviceId: Service
  clientId: Client
  dosage?: string
  product?: string
  devices?: { [key: string]: number }[]
  sites: string
  description: string
  images?: { url: string; publicId: string }[]
  signatures: {
    client: { url: string; publicId: string }
    technical: { url: string; publicId: string }
  }
}

const ServiceDataUploadSchema = new mongoose.Schema<ServiceDataUpload>({
  serviceType: { type: String, required: true },
  serviceId: { type: mongoose.Types.ObjectId, ref: 'Service', required: true },
  clientId: { type: mongoose.Types.ObjectId, ref: 'Client', required: true },
  dosage: { type: String, required: false },
  product: { type: String, required: false },
  sites: { type: String, required: true },
  devices: { type: [Schema.Types.Mixed], required: false },
  description: { type: String, required: false },
  images: { type: [{ url: String, publicId: String }], required: false },
  signatures: {
    type: {
      client: { type: { url: String, publicId: String }, required: true },
      technical: { type: { url: String, publicId: String }, required: true },
    },
    required: true,
  },
})

export const ServiceDataUploadModel = mongoose.model('ServiceDataUpload', ServiceDataUploadSchema)

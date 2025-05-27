import mongoose from 'mongoose'
import { ServiceTypes } from '../service/service.schema'

export type ServiceProducts = {
  _id: string
  serviceType: ServiceTypes
  products: { _id: string; name: string; description?: string; risp?: string }[]
  createdAt: Date
}

const ServiceSchema = new mongoose.Schema<ServiceProducts>({
  serviceType: { type: String, enum: ServiceTypes, required: true },
  products: {
    type: [
      {
        name: { type: String, required: true },
        description: { type: String },
        risp: { type: String },
      },
    ],
    required: true,
  },
  createdAt: { type: Date, required: true, default: Date.now },
})

export const ServiceProductsModel = mongoose.model('ServiceProducts', ServiceSchema)

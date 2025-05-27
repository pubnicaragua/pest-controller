import mongoose, { ObjectId } from 'mongoose'

export type Client = {
  _id: ObjectId
  rut: string
  businessName: string
  region: string
  commune: string
  address: string
  totalServices: number
  pendingService: boolean
  contact: string
  email?: string
  geolocalization?: { lat: number; lng: number }
  createdAt: Date
}

const ClientSchema = new mongoose.Schema<Client>({
  rut: { type: String, required: true },
  businessName: { type: String, required: true },
  region: { type: String, required: true },
  commune: { type: String, required: true },
  address: { type: String, required: true },
  totalServices: { type: Number, required: true, default: 0 },
  pendingService: { type: Boolean, required: true, default: false },
  contact: { type: String, required: true },
  email: { type: String, required: false },
  geolocalization: { type: { lat: Number, lng: Number }, required: false },
  createdAt: { type: Date, required: true, default: Date.now },
})

export const ClientModel = mongoose.model('Client', ClientSchema)

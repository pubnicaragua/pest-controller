import mongoose, { ObjectId } from 'mongoose'

export enum UserRoles {
  'SUPERADMIN' = 'SUPERADMIN',
  'ADMIN' = 'ADMIN',
  'TECHNICAL' = 'TECHNICAL',
}

export type User = {
  _id: string
  name: string
  lastname: string
  phoneNumber: number
  email: string
  password: string
  region: string
  commune: string
  address: string
  rut: string
  role: UserRoles
  enabled: boolean
  totalServices: number
  createdAt: Date
}

const UserSchema = new mongoose.Schema<User>({
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  phoneNumber: { type: Number, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true, default: 'DEFAULT' },
  region: { type: String, required: true },
  commune: { type: String, required: true },
  address: { type: String, required: true },
  rut: { type: String, required: true },
  role: { type: String, enum: UserRoles, required: true, default: UserRoles.TECHNICAL },
  totalServices: { type: Number, required: true, default: 0 },
  enabled: { type: Boolean, required: true, default: false },
  createdAt: { type: Date, required: true, default: Date.now },
})

export const UserModel = mongoose.model('User', UserSchema)

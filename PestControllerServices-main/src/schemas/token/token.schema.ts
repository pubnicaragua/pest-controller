import mongoose, { ObjectId } from 'mongoose'

type Token = {
  email: string
  token: number
  expiredAt: Date
}

const TokenSchema = new mongoose.Schema<Token>(
  {
    email: { type: String, required: true },
    token: { type: Number, required: true },
    expiredAt: { type: Date, expires: '10m', default: Date.now },
  },
  {
    expireAfterSeconds: 600,
  }
)

export const TokenModel = mongoose.model('Token', TokenSchema)

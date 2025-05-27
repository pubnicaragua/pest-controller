import mongoose, { ObjectId } from 'mongoose'

export type Observation = {
  _id: ObjectId
  serviceId: ObjectId
  total: Total
  activities: Activity[]
  createdAt: Date
}

export type Total = {
  gnawed: number // roido
  rodentSample: number // muestra roedor
  stolen: number // sustraído
  destroyed: number // destruído
  fungus: number // hongo
  dust: number // polvo
  rodentCapture: number // captura roidor
  blocked: number // bloqueado
  slug: number // babosa
  installedPoints: number // puntos instalados
  noActivityTotal: number // total sin actividad
}

export type Activity = {
  ec: number
  obs: number
  detail?: string
  image?: { url: string; publicId: string }
}

const ObservationSchema = new mongoose.Schema<Observation>({
  serviceId: { type: mongoose.Types.ObjectId, ref: 'Service', required: true },
  total: {
    type: {
      gnawed: { type: Number, required: true },
      rodentSample: { type: Number, required: true },
      stolen: { type: Number, required: true },
      destroyed: { type: Number, required: true },
      fungus: { type: Number, required: true },
      dust: { type: Number, required: true },
      rodentCapture: { type: Number, required: true },
      blocked: { type: Number, required: true },
      slug: { type: Number, required: true },
      installedPoints: { type: Number, required: true },
      noActivityTotal: { type: Number, required: true },
    },
    required: true,
  },
  activities: {
    type: [
      {
        ec: { type: Number, required: false },
        obs: { type: Number, required: false },
        detail: { type: String, required: false },
        image: { type: { url: String, publicId: String }, required: false },
      },
    ],
    required: true,
  },
  createdAt: { type: Date, required: true, default: Date.now },
})

export const ObservationModel = mongoose.model('Observation', ObservationSchema)

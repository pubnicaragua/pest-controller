import { Client } from '../client/type'
import { Service, ServiceTypes } from '../services/type'

export type RegisterServiceDataUploadDTO = {
  serviceType: ServiceTypes
  serviceId: string
  clientId: string
  dosage?: string
  product: string
  devices?: { [key: string]: number }[]
  sites: string
  description: string
  observations?: ObservationPayload
  images?: string[]
  signatures: { client: string; technical: string }
  geolocation?: { lat: number; lng: number }
}

export type UploadImageDatauploadDTO = {
  images: { publicId: string; url: string }[]
}

export type Dataupload = {
  serviceType: ServiceTypes
  serviceId: Service
  clientId: Client
  dosage?: string
  product: string
  devices?: { [key: string]: number }[]
  sites: string
  description: string
  images?: { url: string; publicId: string }[]
  signatures: {
    client: { url: string; publicId: string }
    technical: { url: string; publicId: string }
  }
}

export type DataUploadObservation = {
  dataupload: Dataupload
  observation: Observation
}

export type Observation = {
  _id: string
  serviceId: string
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
  rodentCapture: number // captura roedor
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

export type ActivityPayload = {
  ec: number
  obs: number
  detail?: string
  image?: { publicId: string; url: string }
}

export type ObservationPayload = {
  total: Total
  activities: ActivityPayload[]
}

export enum TranslateObsTotal {
  'gnawed' = 'Roído',
  'rodentSample' = 'Muestra roedor',
  'stolen' = 'Sustraído',
  'destroyed' = 'Destruído',
  'fungus' = 'Hongo',
  'dust' = 'Polvo',
  'rodentCapture' = 'Captura roidor',
  'blocked' = 'Bloqueado',
  'slug' = 'Babosa',
  'installedPoints' = 'Puntos instalados',
  'noActivityTotal' = 'Total sin actividad',
}

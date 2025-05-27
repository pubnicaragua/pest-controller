import { ObservationDTO } from '../observation/observation.dto'
import { ServiceTypes } from '../service/service.schema'

export type RegisterServiceDataUploadDTO = {
  serviceType: ServiceTypes
  serviceId: string
  clientId: string
  dosage: string
  product: string
  devices?: { [key: string]: string }[]
  sites: string
  observations: ObservationDTO
  description?: string
  signatures: {
    client: string
    technical: string
  }
  geolocation?: { lat: number; lng: number }
}

export type UploadImageDatauploadDTO = {
  images: { publicId: string; url: string }[]
}

import { Activity, Total } from './observation.schema'

export type ObservationDTO = {
  total: Total
  activities: ActivityDTO[]
}

export type ActivityDTO = {
  ec: number
  obs: number
  detail?: string
  image?: { publicId: string; url: string }
}

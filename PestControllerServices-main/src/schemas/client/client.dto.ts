export type RegisterClientDTO = {
  rut: string
  businessName: string
  region: string
  commune: string
  address: string
  totalServices: number
  pendingService: boolean
  contact: string
  email?: string
  geolocalization: { lat: number; lng: number }
}

export type UpdateClientDTO = {
  rut?: string
  businessName?: string
  region?: string
  commune?: string
  address?: string
  totalServices?: number
  pendingService?: boolean
  contact?: string
  email?: string
  geolocalization?: { lat: number; lng: number }
}

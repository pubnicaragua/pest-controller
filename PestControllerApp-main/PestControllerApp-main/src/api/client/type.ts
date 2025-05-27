export type Client = {
  _id: string
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

// PAYLOADS
export type RegisterClientPayload = {
  rut: string
  businessName: string
  region: string
  commune: string
  address: string
  contact: string
  email?: string
  geolocalization?: { lat: number; lng: number }
}

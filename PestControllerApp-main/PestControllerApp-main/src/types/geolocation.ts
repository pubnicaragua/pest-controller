export interface GeoLocation {  
  lat: number  
  lng: number  
  timestamp?: Date  
  accuracy?: number  
  speed?: number  
}  
  
export interface TrackingPoint extends GeoLocation {  
  timestamp: Date  
  serviceId: string  
  technicalId: string  
}  
  
export interface RouteHistory {  
  serviceId: string  
  technicalId: string  
  startTime: Date  
  endTime?: Date  
  points: TrackingPoint[]  
  totalDistance?: number  
  averageSpeed?: number  
}  
  
export interface LocationUpdatePayload {  
  serviceId: string  
  location: GeoLocation  
  metadata?: {  
    batteryLevel?: number  
    networkType?: string  
    deviceInfo?: string  
  }  
}
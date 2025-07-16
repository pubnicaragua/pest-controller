export interface BiometricData {  
  pressure: number[]  
  velocity: number[]  
  timestamp: number[]  
  duration: number  
  strokeCount: number  
  hash: string  
  deviceInfo?: DeviceInfo  
}  
  
export interface DeviceInfo {  
  userAgent: string  
  screenResolution: string  
  touchSupport: boolean  
  devicePixelRatio: number  
}  
  
export interface SignatureData {  
  imageData: string  
  biometrics: BiometricData  
  metadata: SignatureMetadata  
}  
  
export interface SignatureMetadata {  
  signedAt: Date  
  signedBy: string  
  serviceId: string  
  signatureType: 'client' | 'technical'  
  ipAddress?: string  
  location?: {  
    lat: number  
    lng: number  
  }  
}  
  
export interface EncryptedSignature {  
  encryptedData: string  
  iv: string  
  authTag: string  
  biometricHash: string  
}
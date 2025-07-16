import CryptoJS from 'crypto-js'  
import { BiometricData, SignatureData, EncryptedSignature } from '@/types/biometrics'  
  
const ENCRYPTION_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY || 'default-key-change-in-production'  
  
export class SignatureEncryption {  
    
  static generateBiometricHash(biometrics: BiometricData): string {  
    const biometricString = JSON.stringify({  
      pressureAvg: biometrics.pressure.reduce((a, b) => a + b, 0) / biometrics.pressure.length,  
      velocityAvg: biometrics.velocity.reduce((a, b) => a + b, 0) / biometrics.velocity.length,  
      duration: biometrics.duration,  
      strokeCount: biometrics.strokeCount,  
      deviceInfo: biometrics.deviceInfo  
    })  
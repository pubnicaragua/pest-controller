// src/utils/qrGenerator.ts  
import QRCode from 'qrcode'  
  
export const generateServiceQR = async (serviceId: string): Promise<string> => {  
  const serviceUrl = `${process.env.NEXT_PUBLIC_APP_URL}/services/${serviceId}`  
    
  const qrOptions = {  
    errorCorrectionLevel: 'M' as const,  
    type: 'image/png' as const,  
    quality: 0.92,  
    margin: 1,  
    color: {  
      dark: '#000000',  
      light: '#FFFFFF'  
    }  
  }  
  
  return await QRCode.toDataURL(serviceUrl, qrOptions)  
}
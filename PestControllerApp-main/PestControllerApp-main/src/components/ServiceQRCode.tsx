// src/components/ServiceQRCode.tsx  
import { useState, useEffect } from 'react'  
import { generateServiceQR } from '@/utils/qrGenerator'  
  
interface ServiceQRCodeProps {  
  serviceId: string  
  clientName: string  
}  
  
export const ServiceQRCode: React.FC<ServiceQRCodeProps> = ({ serviceId, clientName }) => {  
  const [qrCode, setQrCode] = useState<string>('')  
  
  useEffect(() => {  
    generateServiceQR(serviceId).then(setQrCode)  
  }, [serviceId])  
  
  const downloadQR = () => {  
    const link = document.createElement('a')  
    link.download = `servicio-${serviceId}-qr.png`  
    link.href = qrCode  
    link.click()  
  }  
  
  return (  
    <div className="flex flex-col items-center gap-3">  
      <h3 className="font-semibold">Código QR del Servicio</h3>  
      {qrCode && (  
        <>  
          <img src={qrCode} alt={`QR Code for service ${serviceId}`} className="w-32 h-32" />  
          <button onClick={downloadQR} className="btn-secondary">  
            Descargar QR  
          </button>  
        </>  
      )}  
    </div>  
  )  
}
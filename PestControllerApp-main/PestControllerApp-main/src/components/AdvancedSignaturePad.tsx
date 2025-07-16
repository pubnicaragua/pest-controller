// src/components/AdvancedSignaturePad.tsx  
import { useRef, useState } from 'react'  
import SignaturePad from 'react-signature-canvas'  
import CryptoJS from 'crypto-js'  
  
interface AdvancedSignaturePadProps {  
  onSignatureCapture: (signature: string, biometrics: BiometricData) => void  
  label: string  
}  
  
interface BiometricData {  
  pressure: number[]  
  velocity: number[]  
  timestamp: number[]  
  hash: string  
}  
  
export const AdvancedSignaturePad: React.FC<AdvancedSignaturePadProps> = ({   
  onSignatureCapture,   
  label   
}) => {  
  const signRef = useRef<SignaturePad>()  
  const [biometrics, setBiometrics] = useState<BiometricData>({  
    pressure: [],  
    velocity: [],  
    timestamp: [],  
    hash: ''  
  })  
  
  const handleSignatureEnd = () => {  
    if (signRef.current) {  
      const signatureData = signRef.current.getTrimmedCanvas().toDataURL('image/png')  
        
      // Generar hash biométrico  
      const biometricHash = CryptoJS.SHA256(  
        JSON.stringify({  
          pressure: biometrics.pressure,  
          velocity: biometrics.velocity,  
          duration: biometrics.timestamp[biometrics.timestamp.length - 1] - biometrics.timestamp[0]  
        })  
      ).toString()  
  
      const finalBiometrics = { ...biometrics, hash: biometricHash }  
      onSignatureCapture(signatureData, finalBiometrics)  
    }  
  }  
  
  return (  
    <div>  
      <label className="font-semibold">{label}</label>  
      <SignaturePad  
        ref={signRef}  
        onEnd={handleSignatureEnd}  
        canvasProps={{  
          style: {  
            width: '100%',  
            height: 200,  
            border: '1px solid #primary',  
            borderRadius: '8px',  
          },  
        }}  
      />  
    </div>  
  )  
}
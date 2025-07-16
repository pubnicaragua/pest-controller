import { useState, useEffect, useRef } from 'react'  
import { api } from '@/api'  
import toast from 'react-hot-toast'  
  
interface GeoPosition {  
  lat: number  
  lng: number  
  timestamp: Date  
  accuracy?: number  
  speed?: number  
}  
  
interface UseGeoTrackingReturn {  
  currentPosition: GeoPosition | null  
  trackingHistory: GeoPosition[]  
  isTracking: boolean  
  startTracking: () => void  
  stopTracking: () => void  
  clearHistory: () => void  
}  
  
export const useGeoTracking = (serviceId: string): UseGeoTrackingReturn => {  
  const [currentPosition, setCurrentPosition] = useState<GeoPosition | null>(null)  
  const [trackingHistory, setTrackingHistory] = useState<GeoPosition[]>([])  
  const [isTracking, setIsTracking] = useState<boolean>(false)  
  const watchId = useRef<number | null>(null)  
  const intervalId = useRef<NodeJS.Timeout | null>(null)  
  
  const startTracking = () => {  
    if (!('geolocation' in navigator)) {  
      toast.error('Geolocalización no disponible en este dispositivo')  
      return  
    }  
  
    setIsTracking(true)  
      
    watchId.current = navigator.geolocation.watchPosition(  
      (position) => {  
        const newPos: GeoPosition = {  
          lat: position.coords.latitude,  
          lng: position.coords.longitude,  
          timestamp: new Date(),  
          accuracy: position.coords.accuracy,  
          speed: position.coords.speed || undefined  
        }  
          
        setCurrentPosition(newPos)  
        setTrackingHistory(prev => [...prev, newPos])  
      },  
      (error) => {  
        console.error('Error en tracking GPS:', error)  
        toast.error(`Error de geolocalización: ${error.message}`)  
      },  
      {  
        enableHighAccuracy: true,  
        timeout: 10000,  
        maximumAge: 30000  
      }  
    )  
  
    // Enviar posición al backend cada 2 minutos  
    intervalId.current = setInterval(() => {  
      if (currentPosition) {  
        sendLocationToBackend(currentPosition)  
      }  
    }, 120000)  
  }  
  
  const stopTracking = () => {  
    setIsTracking(false)  
      
    if (watchId.current !== null) {  
      navigator.geolocation.clearWatch(watchId.current)  
      watchId.current = null  
    }  
      
    if (intervalId.current) {  
      clearInterval(intervalId.current)  
      intervalId.current = null  
    }  
  }  
  
  const clearHistory = () => {  
    setTrackingHistory([])  
  }  
  
  const sendLocationToBackend = async (position: GeoPosition) => {  
    try {  
      await api.tracking.updateTechnicalLocation(serviceId, {  
        lat: position.lat,  
        lng: position.lng,  
        timestamp: position.timestamp,  
        accuracy: position.accuracy,  
        speed: position.speed  
      })  
    } catch (error) {  
      console.error('Error enviando ubicación:', error)  
    }  
  }  
  
  useEffect(() => {  
    return () => {  
      stopTracking()  
    }  
  }, [])  
  
  return {  
    currentPosition,  
    trackingHistory,  
    isTracking,  
    startTracking,  
    stopTracking,  
    clearHistory  
  }  
}
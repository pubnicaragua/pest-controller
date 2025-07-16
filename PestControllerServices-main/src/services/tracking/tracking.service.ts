import { Request, Response } from 'express'  
import { TrackingModel } from '../../schemas/tracking/tracking.schema'  
import { ServiceModel } from '../../schemas/service/service.schema'  
import { UserModel } from '../../schemas/user/user.schema'  
import dayjs from 'dayjs'  
  
interface LocationUpdateRequest {  
  lat: number  
  lng: number  
  timestamp: Date  
  accuracy?: number  
  speed?: number  
}  
  
export const updateTechnicalLocation = async (  
  req: Request<{ serviceId: string }, {}, LocationUpdateRequest>,  
  res: Response  
) => {  
  try {  
    const { serviceId } = req.params  
    const { lat, lng, timestamp, accuracy, speed } = req.body  
    const technicalId = req.user?.id  
  
    if (!technicalId) {  
      res.status(401).json({ success: 'FAILED', message: 'Usuario no autenticado' })  
      return  
    }  
  
    // Verificar que el servicio existe y está asignado al técnico  
    const service = await ServiceModel.findOne({  
      _id: serviceId,  
      technicalId: technicalId  
    })  
  
    if (!service) {  
      res.status(404).json({ success: 'FAILED', message: 'Servicio no encontrado o no asignado' })  
      return  
    }  
  
    // Crear o actualizar registro de tracking  
    const trackingData = {  
      serviceId,  
      technicalId,  
      location: {  
        lat,  
        lng,  
        timestamp: timestamp || new Date(),  
        accuracy,  
        speed  
      },  
      metadata: {  
        userAgent: req.headers['user-agent'],  
        ip: req.ip  
      }  
    }  
  
    await TrackingModel.create(trackingData)  
  
    res.status(200).json({  
      success: 'OK',  
      message: 'Ubicación actualizada correctamente'  
    })  
  } catch (error) {  
    console.error('Error actualizando ubicación:', error)  
    res.status(500).json({  
      success: 'FAILED',  
      message: 'Error del servidor'  
    })  
  }  
}  
  
export const getServiceTrackingHistory = async (  
  req: Request<{ serviceId: string }>,  
  res: Response  
) => {  
  try {  
    const { serviceId } = req.params  
  
    const trackingHistory = await TrackingModel.find({ serviceId })  
      .populate('technicalId', 'name lastname')  
      .sort({ 'location.timestamp': 1 })  
  
    if (!trackingHistory.length) {  
      res.status(404).json({  
        success: 'FAILED',  
        message: 'No se encontró historial de tracking para este servicio'  
      })  
      return  
    }  
  
    // Calcular estadísticas  
    const points = trackingHistory.map(t => t.location)  
    const totalDistance = calculateTotalDistance(points)  
    const duration = dayjs(points[points.length - 1].timestamp).diff(points[0].timestamp, 'minutes')  
  
    res.status(200).json({  
      success: 'OK',  
      data: {  
        serviceId,  
        points: trackingHistory,  
        statistics: {  
          totalDistance,  
          duration,  
          averageSpeed: totalDistance > 0 ? (totalDistance / duration) * 60 : 0  
        }  
      }  
    })  
  } catch (error) {  
    console.error('Error obteniendo historial:', error)  
    res.status(500).json({  
      success: 'FAILED',  
      message: 'Error del servidor'  
    })  
  }  
}  
  
export const getActiveTechnicals = async (req: Request, res: Response) => {  
  try {  
    const fiveMinutesAgo = dayjs().subtract(5, 'minutes').toDate()  
  
    const activeTechnicals = await TrackingModel.aggregate([  
      {  
        $match: {  
          'location.timestamp': { $gte: fiveMinutesAgo }  
        }  
      },  
      {  
        $sort: { 'location.timestamp': -1 }  
      },  
      {  
        $group: {  
          _id: '$technicalId',  
          lastLocation: { $first: '$location' },  
          serviceId: { $first: '$serviceId' }  
        }  
      },  
      {  
        $lookup: {  
          from: 'users',  
          localField: '_id',  
          foreignField: '_id',  
          as: 'technical'  
        }  
      },  
      {  
        $lookup: {  
          from: 'services',  
          localField: 'serviceId',  
          foreignField: '_id',  
          as: 'service'  
        }  
      }  
    ])  
  
    res.status(200).json({  
      success: 'OK',  
      data: activeTechnicals  
    })  
  } catch (error) {  
    console.error('Error obteniendo técnicos activos:', error)  
    res.status(500).json({  
      success: 'FAILED',  
      message: 'Error del servidor'  
    })  
  }  
}  
  
export const getTechnicalCurrentLocation = async (  
  req: Request<{ technicalId: string }>,  
  res: Response  
) => {  
  try {  
    const { technicalId } = req.params  
  
    const lastLocation = await TrackingModel.findOne({ technicalId })  
      .sort({ 'location.timestamp': -1 })  
      .populate('serviceId', 'clientId serviceType')  
  
    if (!lastLocation) {  
      res.status(404).json({  
        success: 'FAILED',  
        message: 'No se encontró ubicación para este técnico'  
      })  
      return  
    }  
  
    res.status(200).json({  
      success: 'OK',  
      data: lastLocation  
    })  
  } catch (error) {  
    console.error('Error obteniendo ubicación actual:', error)  
    res.status(500).json({  
      success: 'FAILED',  
      message: 'Error del servidor'  
    })  
  }  
}  
  
// Función auxiliar para calcular distancia total  
function calculateTotalDistance(points: Array<{ lat: number; lng: number }>): number {  
  if (points.length < 2) return 0  
  
  let totalDistance = 0  
  for (let i = 1; i < points.length; i++) {  
    totalDistance += calculateDistance(points[i - 1], points[i])  
  }  
  return totalDistance  
}  
  
function calculateDistance(  
  point1: { lat: number; lng: number },  
  point2: { lat: number; lng: number }  
): number {  
  const R = 6371 // Radio de la Tierra en km  
  const dLat = (point2.lat - point1.lat) * (Math.PI / 180)  
  const dLng = (point2.lng - point1.lng) * (Math.PI / 180)  
  const a =  
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +  
    Math.cos(point1.lat * (Math.PI / 180)) *  
      Math.cos(point2.lat * (Math.PI / 180)) *  
      Math.sin(dLng / 2) *  
      Math.sin(dLng / 2)  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))  
  return R * c  
}
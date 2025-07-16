import { Router } from 'express'  
import { verifyToken } from '../../middlewares/verifyToken'  
import { hasRole } from '../../middlewares/hasRole'  
import { UserRole } from '../../schemas/user/user.schema'  
import {  
  updateTechnicalLocation,  
  getServiceTrackingHistory,  
  getActiveTechnicals,  
  getTechnicalCurrentLocation  
} from '../../services/tracking/tracking.service'  
  
const router = Router()  
  
// Actualizar ubicación del técnico  
router.put(  
  '/location/:serviceId',  
  verifyToken,  
  hasRole([UserRole.TECHNICAL, UserRole.ADMIN, UserRole.SUPERADMIN]),  
  updateTechnicalLocation  
)  
  
// Obtener historial de tracking de un servicio  
router.get(  
  '/service/:serviceId/history',  
  verifyToken,  
  hasRole([UserRole.ADMIN, UserRole.SUPERADMIN]),  
  getServiceTrackingHistory  
)  
  
// Obtener técnicos activos en campo  
router.get(  
  '/active-technicals',  
  verifyToken,  
  hasRole([UserRole.ADMIN, UserRole.SUPERADMIN]),  
  getActiveTechnicals  
)  
  
// Obtener ubicación actual de un técnico  
router.get(  
  '/technical/:technicalId/current',  
  verifyToken,  
  hasRole([UserRole.ADMIN, UserRole.SUPERADMIN]),  
  getTechnicalCurrentLocation  
)  
  
export default router
import { Router } from 'express'
import authRoutes from './auth/auth.routes'
import clientRoutes from './clients/client.routes'
import datauploadRoutes from './dataupload/dataupload.routes'
import usersRoutes from './users/users.route'
import reportsRoutes from './reports/report.routes'
import serviceRoutes from './services/services.routes'
import serviceDevicesRoutes from './serviceDevices/serviceDevices.routes'
import serviceProductsRoutes from './serviceProducts/servicesProducts.routes'
import { verifyToken } from '../middleware/auth.middleware'

const router = Router()

router.use('/auth', authRoutes)

// Protected routes
router.use('/clients', verifyToken, clientRoutes)
router.use('/datauploads', verifyToken, datauploadRoutes)
router.use('/users', verifyToken, usersRoutes)
router.use('/reports', verifyToken, reportsRoutes)
router.use('/services', verifyToken, serviceRoutes)
router.use('/services-devices', verifyToken, serviceDevicesRoutes)
router.use('/services-products', verifyToken, serviceProductsRoutes)

export default router

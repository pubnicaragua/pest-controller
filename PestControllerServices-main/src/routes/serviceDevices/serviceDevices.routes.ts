import { Router } from 'express'
import { hasRole } from '../../middleware/auth.middleware'
import { UserRoles } from '../../schemas/users/users.schema'
import { getServiceDevices, registerServiceDevices } from '../../services/service/serviceDevices/serviceDevices.service'

const router = Router()

router.post('/', hasRole([UserRoles.SUPERADMIN, UserRoles.ADMIN]), (req, res) => registerServiceDevices(req, res))

router.get(
  '/',
  hasRole([UserRoles.SUPERADMIN, UserRoles.ADMIN, UserRoles.TECHNICAL]),
  (req, res) => getServiceDevices(req, res)
)

export default router

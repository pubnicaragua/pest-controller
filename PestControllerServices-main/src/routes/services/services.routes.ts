import { Request, Router } from 'express'
import { hasRole } from '../../middleware/auth.middleware'
import { UserRoles } from '../../schemas/users/users.schema'
import {
  removeOnlyService,
  scheduleService,
  servicesList,
  singleService,
  startService,
  updateService,
} from '../../services/service/service.services'

const router = Router()

router.post('/', hasRole([UserRoles.SUPERADMIN, UserRoles.ADMIN]), (req, res) => scheduleService(req, res))

router.get('/', hasRole([UserRoles.SUPERADMIN, UserRoles.ADMIN, UserRoles.TECHNICAL]), (req, res) =>
  servicesList(req, res)
)

router.get(
  '/:id',
  hasRole([UserRoles.SUPERADMIN, UserRoles.ADMIN, UserRoles.TECHNICAL]),
  (req: Request<{ id: string }>, res) => singleService(req, res)
)

router.put('/:id', hasRole([UserRoles.SUPERADMIN, UserRoles.ADMIN]), (req: Request<{ id: string }>, res) =>
  updateService(req, res)
)

router.put('/:id/start', (req, res) => startService(req, res))

router.delete('/:id', hasRole([UserRoles.SUPERADMIN]), (req: Request<{ id: string }>, res) =>
  removeOnlyService(req, res)
)

export default router

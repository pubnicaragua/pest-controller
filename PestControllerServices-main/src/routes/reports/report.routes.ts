import { Request, Response, Router } from 'express'
import { hasRole } from '../../middleware/auth.middleware'
import { UserRoles } from '../../schemas/users/users.schema'
import { getInitialReports, reportsByClient } from '../../services/reports/reports.service'
import { ServiceTypes } from '../../schemas/service/service.schema'

const router = Router()

router.get('/', hasRole([UserRoles.SUPERADMIN, UserRoles.ADMIN]), (req, res) => getInitialReports(req, res))

router.get(
  '/:clientId',
  hasRole([UserRoles.SUPERADMIN, UserRoles.ADMIN]),
  (req: Request<{ clientId: string }, {}, {}, { serviceType: ServiceTypes }>, res: Response) =>
    reportsByClient(req, res)
)

export default router

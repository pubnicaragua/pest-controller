import { Request, Response, Router } from 'express'
import {
  clientsList,
  registerNewClient,
  removeOnlyClient,
  singleClient,
  updateClient,
} from '../../services/client/client.services'
import { hasRole } from '../../middleware/auth.middleware'
import { UserRoles } from '../../schemas/users/users.schema'

const router = Router()

router.post('/', hasRole([UserRoles.SUPERADMIN, UserRoles.ADMIN]), (req, res) => registerNewClient(req, res))

router.get(
  '/',
  hasRole([UserRoles.SUPERADMIN, UserRoles.ADMIN]),
  (req: Request<{}, {}, {}, { value?: string }>, res: Response) => clientsList(req, res)
)

router.put('/:id', hasRole([UserRoles.SUPERADMIN, UserRoles.ADMIN]), (req: Request<{ id: string }>, res) =>
  updateClient(req, res)
)

router.get('/:id', hasRole([UserRoles.SUPERADMIN, UserRoles.ADMIN]), (req: Request<{ id: string }>, res) =>
  singleClient(req, res)
)

router.delete('/:id', hasRole([UserRoles.SUPERADMIN]), (req: Request<{ id: string }>, res) =>
  removeOnlyClient(req, res)
)

export default router

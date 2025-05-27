import { Request, Router } from 'express'
import {
  enableUser,
  onlyTechnicalList,
  registerNewUser,
  removeOnlyUser,
  singleUserById,
  updateUser,
  usersList,
} from '../../services/users/user.services'
import { hasRole } from '../../middleware/auth.middleware'
import { UserRoles } from '../../schemas/users/users.schema'

const router = Router()

router.post('/', (req, res) => registerNewUser(req, res))

router.get('/', hasRole([UserRoles.SUPERADMIN, UserRoles.ADMIN]), (req, res) => usersList(req, res))

router.get('/technicals', hasRole([UserRoles.SUPERADMIN, UserRoles.ADMIN]), (req, res) => onlyTechnicalList(req, res))

router.get('/:id', hasRole([UserRoles.SUPERADMIN, UserRoles.ADMIN]), (req: Request<{ id: string }>, res) =>
  singleUserById(req, res)
)

router.put('/:id/enabled', hasRole([UserRoles.SUPERADMIN]), (req: Request<{ id: string }>, res) => enableUser(req, res))

router.put(
  '/:id',
  hasRole([UserRoles.SUPERADMIN, UserRoles.ADMIN, UserRoles.TECHNICAL]),
  (req: Request<{ id: string }>, res) => updateUser(req, res)
)

router.delete('/:id', hasRole([UserRoles.SUPERADMIN]), (req: Request<{ id: string }>, res) => removeOnlyUser(req, res))

export default router

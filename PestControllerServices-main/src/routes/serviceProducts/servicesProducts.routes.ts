import { Request, Response, Router } from 'express'
import { hasRole } from '../../middleware/auth.middleware'
import { UserRoles } from '../../schemas/users/users.schema'
import {
  addNewProduct,
  createServiceProducts,
  getServiceProducts,
  removeProduct,
  updateProduct,
} from '../../services/serviceProducts/serviceProducts.service'
import { ServiceTypes } from '../../schemas/service/service.schema'

const router = Router()

router.post('/', hasRole([UserRoles.SUPERADMIN, UserRoles.ADMIN]), (req, res) => createServiceProducts(req, res))

router.get('/', hasRole([UserRoles.SUPERADMIN, UserRoles.ADMIN, UserRoles.TECHNICAL]), (req, res) =>
  getServiceProducts(req, res)
)

/* PRODUCTS LIST */
router.post('/products-list', hasRole([UserRoles.SUPERADMIN]), (req, res) => addNewProduct(req, res))

router.delete(
  '/products-list/:productId',
  hasRole([UserRoles.SUPERADMIN]),
  (req: Request<{ productId: string }, {}, {}, { serviceType: ServiceTypes }>, res: Response) => removeProduct(req, res)
)

router.put('/products-list/:productId', hasRole([UserRoles.SUPERADMIN]), (req: Request<{ productId: string }>, res) =>
  updateProduct(req, res)
)

export default router

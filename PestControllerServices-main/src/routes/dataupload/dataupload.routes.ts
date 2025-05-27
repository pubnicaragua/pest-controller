import { Request, Response, Router } from 'express'
import { hasRole } from '../../middleware/auth.middleware'
import { UserRoles } from '../../schemas/users/users.schema'
import {
  getDataUpload,
  registerDataUpload,
  uploadImagesDataupload,
} from '../../services/serviceDataUpload/serviceDataUpload.service'

const router = Router()

router.post('/', hasRole([UserRoles.SUPERADMIN, UserRoles.ADMIN, UserRoles.TECHNICAL]), (req, res) =>
  registerDataUpload(req, res)
)

router.get(
  '/',
  hasRole([UserRoles.SUPERADMIN, UserRoles.ADMIN, UserRoles.TECHNICAL]),
  (req: Request<{}, {}, {}, { serviceId: string }>, res: Response) => getDataUpload(req, res)
)

router.put(
  '/upload/images/:datauploadId',
  hasRole([UserRoles.SUPERADMIN, UserRoles.ADMIN, UserRoles.TECHNICAL]),
  (req: Request<{ datauploadId: string }>, res: Response) => uploadImagesDataupload(req, res)
)

export default router

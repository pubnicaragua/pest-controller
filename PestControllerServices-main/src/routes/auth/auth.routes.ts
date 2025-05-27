import { Request, Router } from 'express'
import {
  confirmRecoverToken,
  createPassword,
  getMe,
  login,
  recoveryPasswordEmail,
} from '../../services/auth/auth.services'

const router = Router()

router.get('/me', (req, res) => getMe(req, res))

router.post('/login', (req, res) => login(req, res))

router.get('/recover', (req: Request<{}, {}, {}, { email: string }>, res) => recoveryPasswordEmail(req, res))

router.get('/token', (req: Request<{}, {}, {}, { email: string; token: string }>, res) => confirmRecoverToken(req, res))

router.put('/password', (req, res) => createPassword(req, res))

export default router

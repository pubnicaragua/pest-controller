import { Request, Response } from 'express'
import { LoginDTO } from '../../schemas/auth/auth.dto'
import { User, UserModel } from '../../schemas/users/users.schema'
import { CreatePasswordDTO, RecoverConfirmDTO, RecoverPasswordEmailDTO } from '../../schemas/users/user.dto'
import { generateToken, getToken, getUserFromToken } from '../../lib/jwt'
import bcryptjs from 'bcryptjs'
import { TokenModel } from '../../schemas/token/token.schema'
import { generateCode } from '../../lib/number'
import { sendTokenMail } from '../../helpers/emails.helper'

export const getMe = (req: Request, res: Response) => {
  try {
    const token = getToken(req)

    if (!token) {
      res.status(403).json({ succes: 'FAILED', message: 'Acceso denegado! Inicie sesión' })
      return
    }

    const data = getUserFromToken(token)
    if (!data) {
      res.status(403).json({ succes: 'FAILED', message: 'Acceso denegado! Inicie sesión' })
      return
    }

    res.status(200).json({
      success: 'OK',
      payload: data,
      message: 'Información obtenida correctamente',
    })
    return
  } catch (err) {
    res.status(500).json({ succes: 'FAILED', message: 'Error del servidor' })
    return
  }
}

export const login = async (req: Request<{}, {}, LoginDTO>, res: Response) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      res.status(400).json({ success: 'FAILED', message: 'Ingrese el correo y la contraseña' })
      return
    }

    const user = await UserModel.findOne({ email })
    if (!user) {
      res.status(400).json({ success: 'FAILED', message: 'Correo electróncio incorrecto' })
      return
    }

    if (password !== 'DEFAULT' && user.password === 'DEFAULT') {
      res.status(403).json({ success: 'FAILED', message: 'Contraseña incorrecta' })
      return
    }

    if (user.password === 'DEFAULT') {
      res.status(202).json({ success: 'OK', message: 'Registre su contraseña de acceso' })
      return
    }

    const passwordValid = await bcryptjs.compare(password, user.password)
    if (!passwordValid) {
      res.status(400).json({ success: 'FAILED', message: 'Contraseña incorrecta' })
      return
    }

    const token = generateToken<User>(user)

    res.status(200).json({ success: 'OK', payload: { user, token }, message: 'Inicio de sesión correcto' })
    return
  } catch (err) {
    res.status(500).json({ succes: 'FAILED', message: 'Error del servidor' })
    return
  }
}

export const recoveryPasswordEmail = async (req: Request<{}, {}, {}, RecoverPasswordEmailDTO>, res: Response) => {
  try {
    const { email } = req.query

    if (!email) {
      res.status(400).json({ success: 'FAILED', message: 'Ingrese el correo' })
      return
    }

    const user = await UserModel.findOne({ email })
    if (!user) {
      res.status(400).json({ success: 'FAILED', message: 'Correo electróncio incorrecto' })
      return
    }

    const token = Number(generateCode(6))

    const nodemailer = await sendTokenMail(token, user.email)

    if (!nodemailer.messageId) {
      res.status(405).json({
        success: 'FAILED',
        message: 'No se pudo enviar el correo',
      })
      return
    }

    await TokenModel.create({ email: user.email, token })

    res.status(200).json({
      success: 'OK',
      data: user.email,
      message: 'Le hemos enviado un código de confirmación a su correo! Introduzcalo a continuación',
    })
    return
  } catch (err) {
    res.status(500).json({ succes: 'FAILED', message: 'Error del servidor' })
    return
  }
}

export const confirmRecoverToken = async (req: Request<{}, {}, {}, RecoverConfirmDTO>, res: Response) => {
  try {
    const { email, token } = req.query

    const searchToken = await TokenModel.findOne({ email })
    if (!searchToken) {
      res.status(401).json({
        success: 'FAILED',
        message: 'El código de verificación ya expiró',
      })
      return
    }

    if (searchToken.token !== Number(token)) {
      res.status(401).json({
        success: 'FAILED',
        message: 'El código de verificación es incorrecto',
      })
      return
    }

    await searchToken.deleteOne()

    res.status(200).json({
      success: 'OK',
      message: 'Verificación exitosa',
    })
    return
  } catch (err) {
    res.status(500).json({ succes: 'FAILED', message: 'Error del servidor' })
    return
  }
}

export const createPassword = async (req: Request<{}, {}, CreatePasswordDTO>, res: Response) => {
  try {
    const { email, password, passwordConfirm } = req.body

    const user = await UserModel.findOne({ email })
    if (!user) {
      res.status(400).json({ success: 'FAILED', message: 'Correo electróncio incorrecto' })
      return
    }

    if (password !== passwordConfirm) {
      res.status(400).json({ success: 'FAILED', message: 'Las contraseñas no coinciden' })
      return
    }

    const passEncoded = await bcryptjs.hash(password, 12)

    await user.updateOne({ password: passEncoded, enabled: true })

    res.status(200).json({ success: 'OK', message: 'Contraseña creada correctamente' })
    return
  } catch (err) {
    res.status(500).json({ succes: 'FAILED', message: 'Error del servidor' })
    return
  }
}

import { Request, Response } from 'express'
import { RegisterUserDTO } from '../../schemas/users/user.dto'
import { User, UserModel, UserRoles } from '../../schemas/users/users.schema'
import { getUsersListAggregate } from '../../helpers/aggregates/user.aggregates'
import { sendUserRegisteredMail } from '../../helpers/emails.helper'

export const registerNewUser = async (req: Request<{}, {}, RegisterUserDTO>, res: Response) => {
  try {
    const { email, rut } = req.body

    const exists = await UserModel.findOne({ $or: [{ email }, { rut }] })
    if (exists) {
      res.status(400).json({ success: 'FAILED', message: 'El usuario ya se encuentra registrado' })
      return
    }

    const user = await UserModel.create(req.body)
    await user.save()

    const nodemailer = await sendUserRegisteredMail(user.email)

    if (!nodemailer.messageId) {
      res.status(405).json({
        success: 'FAILED',
        message: 'No se pudo enviar el correo',
      })
      return
    }

    res.status(201).json({ success: 'OK', message: 'Usuario registrado correctamente' })
    return
  } catch (err) {
    res.status(500).json({ succes: 'FAILED', message: 'Error del servidor' })
    return
  }
}

export const usersList = async (req: Request<{}, {}, {}, { value?: string }>, res: Response) => {
  try {
    const { role } = res.locals.user.data as User
    const { value } = req.query

    const users = await getUsersListAggregate(role, value)

    res.status(200).json({
      success: 'OK',
      payload: users,
      message: 'Usuarios obtenidos correctamente',
    })
    return
  } catch (err) {
    res.status(500).json({ succes: 'FAILED', message: 'Error del servidor' })
    return
  }
}

export const singleUserById = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params

    const user = await UserModel.findById(id)
    if (!user) {
      res.status(401).json({
        success: 'FAILED',
        message: 'No se encontró al usuario',
      })
      return
    }

    res.status(200).json({
      success: 'OK',
      payload: user,
      message: 'Usuario obtenido correctamente',
    })
    return
  } catch (err) {
    res.status(500).json({ succes: 'FAILED', message: 'Error del servidor' })
    return
  }
}

export const enableUser = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params

    const user = await UserModel.findById(id)
    if (!user) {
      res.status(401).json({
        success: 'FAILED',
        message: 'No se encontró al usuario',
      })
      return
    }

    await user.updateOne({ enabled: !user.enabled })

    res.status(200).json({
      success: 'OK',
      message: `Usuario ${!user.enabled ? 'habilitado' : 'deshabilitado'} exitosamente`,
    })
    return
  } catch (err) {
    res.status(500).json({ succes: 'FAILED', message: 'Error del servidor' })
    return
  }
}

export const onlyTechnicalList = async (req: Request, res: Response) => {
  try {
    const technicals = await UserModel.find({ role: UserRoles.TECHNICAL })

    res.status(200).json({
      success: 'OK',
      payload: technicals,
      message: 'Técnicos obtenidos correctamente',
    })
    return
  } catch (err) {
    res.status(500).json({ succes: 'FAILED', message: 'Error del servidor', err })
    return
  }
}

export const updateUser = async (req: Request<{ id: string }, {}, RegisterUserDTO>, res: Response) => {
  try {
    const { id } = req.params
    const { email, rut } = req.body

    const user = await UserModel.findOne({ _id: id })
    if (!user) {
      res.status(404).json({ success: 'FAILED', message: 'El usuario no fue encontrado' })
      return
    }

    await user.updateOne(req.body)

    res.status(201).json({ success: 'OK', message: 'Usuario actualizado correctamente' })
    return
  } catch (err) {
    res.status(500).json({ succes: 'FAILED', message: 'Error del servidor' })
    return
  }
}

export const removeOnlyUser = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params

    const user = await UserModel.findOne({ _id: id })
    if (!user) {
      res.status(404).json({ success: 'FAILED', message: 'No se encontró la información del usuario' })
      return
    }

    await user.deleteOne()

    res.status(200).json({
      success: 'OK',
      message: 'Usuario eliminado correctamente',
    })
  } catch (err) {
    res.status(500).json({ succes: 'FAILED', message: 'Error del servidor' })
    return
  }
}

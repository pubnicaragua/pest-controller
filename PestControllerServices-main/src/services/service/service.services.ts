import { Request, Response } from 'express'
import { ScheduleServiceDTO, UpdateServiceDTO } from '../../schemas/service/service.dto'
import { ServiceModel, ServiceStatus, ServiceUrgency } from '../../schemas/service/service.schema'
import { User, UserModel } from '../../schemas/users/users.schema'
import { getServicesListAggregate } from '../../helpers/aggregates/service.aggregates'
import { sendClientServiceScheduledMail, sendTechnicalServiceScheduledMail } from '../../helpers/emails.helper'
import { ClientModel } from '../../schemas/client/client.schema'
import dayjs from 'dayjs'

export const scheduleService = async (req: Request<{}, {}, ScheduleServiceDTO>, res: Response) => {
  try {
    const { serviceDate } = req.body

    const client = await ClientModel.findOne({ _id: req.body.clientId })
    if (!client) {
      res.status(404).json({
        success: 'FAILED',
        message: 'No se encontró al cliente',
      })
      return
    }

    if (dayjs(serviceDate).isSame(dayjs()) || dayjs(serviceDate).isAfter(dayjs())) {
      // const nodemailerClient = await sendClientServiceScheduledMail(client.email || '', req.body)
      // if (!nodemailerClient.messageId) {
      //   res.status(405).json({
      //     success: 'FAILED',
      //     message: 'No se pudo enviar el correo',
      //   })
      //   return
      // }

      if (req.body.technicalId) {
        const technical = await UserModel.findOne({ _id: req.body.technicalId })
        if (!technical) {
          res.status(404).json({
            success: 'FAILED',
            message: 'No se encontró al cliente',
          })
          return
        }

        // const nodemailerTechnical = await sendTechnicalServiceScheduledMail(
        //   technical.email,
        //   client.businessName,
        //   req.body
        // )
        // if (!nodemailerTechnical.messageId) {
        //   res.status(405).json({
        //     success: 'FAILED',
        //     message: 'No se pudo enviar el correo',
        //   })
        //   return
        // }

        await technical.updateOne({ $inc: { totalServices: 1 } })
      }
    }

    const service = await ServiceModel.create(req.body)
    await service.save()
    await client.updateOne({ $inc: { totalServices: 1 }, pendingService: true })

    res.status(201).json({ success: 'OK', message: 'Servicio agendado correctamente' })
    return
  } catch (err) {
    res.status(500).json({ succes: 'FAILED', message: 'Error del servidor', err })
    return
  }
}

export const servicesList = async (
  req: Request<{}, {}, {}, { value?: string; urgency?: ServiceUrgency; status?: ServiceStatus }>,
  res: Response
) => {
  try {
    const { _id, role } = res.locals.user.data as User
    const { value, urgency, status } = req.query

    const services = await getServicesListAggregate(role, _id, value, urgency, status)

    res.status(200).json({
      success: 'OK',
      payload: services,
      message: 'Servicios obtenidos correctamente',
    })
    return
  } catch (err) {
    res.status(500).json({ succes: 'FAILED', message: 'Error del servidor' })
    return
  }
}

export const singleService = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params

    const service = await ServiceModel.findOne({ _id: id }).populate(['clientId', 'technicalId'])
    if (!service) {
      res.status(400).json({ success: 'FAILED', message: 'No se encontró la información del servicio' })
      return
    }

    res.status(200).json({
      success: 'OK',
      payload: service,
      message: 'Servicio obtenido correctamente',
    })
  } catch (err) {
    res.status(500).json({ succes: 'FAILED', message: 'Error del servidor' })
    return
  }
}

export const updateService = async (req: Request<{ id: string }, {}, UpdateServiceDTO>, res: Response) => {
  try {
    const { id } = req.params
    const { status, ...rest } = req.body

    const service = await ServiceModel.findOne({ _id: id }).populate(['clientId'])

    if (!service) {
      res.status(400).json({ success: 'FAILED', message: 'Servicio no encontrado' })
      return
    }

    if (service.status === ServiceStatus.DONE) {
      res.status(401).json({ success: 'FAILED', message: 'El servicio ya no se puede actualizar' })
      return
    }

    if (service.status === ServiceStatus.OVERDUE && dayjs(req.body.serviceDate).isAfter(dayjs(service.serviceDate))) {
      await service.updateOne({ status: ServiceStatus.PENDING })
    }

    if (!service.technicalId && req.body.technicalId) {
      const technical = await UserModel.findOne({ _id: req.body.technicalId })
      if (!technical) {
        res.status(404).json({
          success: 'FAILED',
          message: 'No se encontró al cliente',
        })
        return
      }

      const nodemailerTechnical = await sendTechnicalServiceScheduledMail(
        technical.email,
        service.clientId.businessName,
        req.body
      )
      if (!nodemailerTechnical.messageId) {
        res.status(405).json({
          success: 'FAILED',
          message: 'No se pudo enviar el correo',
        })
        return
      }

      await technical.updateOne({ $inc: { totalServices: 1 } })
    }

    await service.updateOne(rest)

    res.status(200).json({ success: 'OK', message: 'Servicio actualizado correctamente' })
    return
  } catch (err) {
    res.status(500).json({ succes: 'FAILED', message: 'Error del servidor' })
    return
  }
}

export const startService = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params

    const service = await ServiceModel.findOne({ _id: id })
    if (!service) {
      res.status(400).json({ success: 'FAILED', message: 'No se encontró la información del servicio' })
      return
    }

    if (!(service.status === ServiceStatus['IN PROGRESS']) && !service.startTime) {
      await service.updateOne({ status: ServiceStatus['IN PROGRESS'], startTime: dayjs().toDate() })
    }

    res.status(200).json({
      success: 'OK',
      message: 'Servicio iniciado correctamente',
    })
  } catch (err) {
    res.status(500).json({ succes: 'FAILED', message: 'Error del servidor' })
    return
  }
}

export const removeOnlyService = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params

    const service = await ServiceModel.findOne({ _id: id })
    if (!service) {
      res.status(404).json({ success: 'FAILED', message: 'No se encontró la información del servicio' })
      return
    }

    await service.deleteOne()

    res.status(200).json({
      success: 'OK',
      message: 'Servicio eliminado correctamente',
    })
  } catch (err) {
    res.status(500).json({ succes: 'FAILED', message: 'Error del servidor' })
    return
  }
}

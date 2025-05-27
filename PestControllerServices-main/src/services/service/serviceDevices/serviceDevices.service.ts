import { Request, Response } from 'express'
import { ServiceDeviceModel } from '../../../schemas/serviceDevices/serviceDevice.schema'
import { RegisterServiceDevicesDTO } from '../../../schemas/serviceDevices/serviceDevice.dto'

export const registerServiceDevices = async (req: Request<{}, {}, RegisterServiceDevicesDTO>, res: Response) => {
  try {
    const { type } = req.body

    const exists = await ServiceDeviceModel.findOne({ type })

    if (exists) {
      res.status(400).json({ succes: 'FAILED', message: 'Los dispositivos para este servicio ya fueron registrados' })
      return
    }

    const service = await ServiceDeviceModel.create(req.body)
    await service.save()

    res.status(201).json({ success: 'OK', message: 'Dispositivos agregados correctamente' })
    return
  } catch (err) {
    res.status(500).json({ succes: 'FAILED', message: 'Error del servidor' })
    return
  }
}

export const getServiceDevices = async (req: Request, res: Response) => {
  try {
    const devices = await ServiceDeviceModel.find()

    if (!devices) {
      res.status(400).json({ succes: 'FAILED', message: 'Los dispositivos para este servicio no han sido registrados' })
      return
    }

    res.status(200).json({ success: 'OK', payload: devices, message: 'Dispositivos obtenidos correctamente' })
    return
  } catch (err) {
    res.status(500).json({ succes: 'FAILED', message: 'Error del servidor' })
    return
  }
}

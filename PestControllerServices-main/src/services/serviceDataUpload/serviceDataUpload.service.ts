import { Request, Response } from 'express'
import {
  RegisterServiceDataUploadDTO,
  UploadImageDatauploadDTO,
} from '../../schemas/serviceDataUpload/serviceDataUpload.dto'
import { ServiceDataUploadModel } from '../../schemas/serviceDataUpload/serviceDataUpload.schema'
import { ServiceModel, ServiceStatus, ServiceTypes } from '../../schemas/service/service.schema'
import { ObservationModel } from '../../schemas/observation/observation.schema'
import { ClientModel } from '../../schemas/client/client.schema'
import { saveObservation } from '../../helpers/observation.helper'
import dayjs from 'dayjs'
import { uploadImage } from '../../helpers/cloudinary.helper'

export const registerDataUpload = async (req: Request<{}, {}, RegisterServiceDataUploadDTO>, res: Response) => {
  try {
    const { serviceType, serviceId, clientId } = req.body
    const { observations, ...rest } = req.body

    const uploadSigns = req.body.signatures.client && req.body.signatures.technical
    if (!uploadSigns) {
      res.status(401).json({ succes: 'FAILED', message: 'La firma del cliente y el técnico son requeridas' })
      return
    }

    const exists = await ServiceDataUploadModel.findOne({ $and: [{ serviceType }, { serviceId }, { clientId }] })

    if (exists) {
      res.status(400).json({ succes: 'FAILED', message: 'Ya fueron cargados los datos de este servicio' })
      return
    }

    const service = await ServiceModel.findOne({ _id: serviceId })
    if (!service) {
      res.status(400).json({ succes: 'FAILED', message: 'No se encontró el servicio realizado' })
      return
    }

    const client = await ClientModel.findOne({ _id: clientId })
    if (!client) {
      res.status(400).json({ succes: 'FAILED', message: 'No se encontró el cliente' })
      return
    }

    const folder =
      service.serviceType === ServiceTypes.DESRATIZACIÓN
        ? 'pest-controller/desratizacion'
        : service.serviceType === ServiceTypes.DESINFECCIÓN
          ? 'pest-controller/desinfeccion'
          : service.serviceType === ServiceTypes.DESINSECTACIÓN
            ? 'pest-controller/desinsectacion'
            : 'pest-controller/personalizado'

    const clientSignature = await uploadImage(
      rest.signatures.client,
      `client-signature`,
      `${folder}/${service._id}/signatures`
    )
    const technicalSignature = await uploadImage(
      rest.signatures.technical,
      `technical-signature`,
      `${folder}/${service._id}/signatures`
    )

    const dataupload = await ServiceDataUploadModel.create({
      ...rest,
      // images: imagesUploaded,
      signatures: {
        client: clientSignature,
        technical: technicalSignature,
      },
    })
    await dataupload.save()

    if (serviceType === ServiceTypes.DESRATIZACIÓN) {
      const saved = await saveObservation(service, observations)
      if (saved !== 'OK') {
        await ServiceDataUploadModel.deleteOne({ _id: dataupload._id })
        res.status(400).json({ succes: 'FAILED', message: saved })
        return
      }
    }

    await client.updateOne({ pendingService: false, totalServices: client.totalServices + 1 })
    await service.updateOne({
      status: ServiceStatus.DONE,
      finishTime: dayjs().toDate(),
      geolocation: req.body?.geolocation ?? null,
    })

    res.status(201).json({ success: 'OK', id: dataupload._id, message: 'Datos del servicio cargados correctamente' })
    return
  } catch (err) {
    res.status(500).json({ succes: 'FAILED', message: 'Error del servidor', err })
    return
  }
}

export const getDataUpload = async (req: Request<{}, {}, {}, { serviceId: string }>, res: Response) => {
  try {
    const { serviceId } = req.query

    const dataupload = await ServiceDataUploadModel.findOne({ serviceId }).populate(['serviceId', 'clientId'])

    if (!dataupload) {
      res.status(400).json({ succes: 'FAILED', message: 'No se encontraron los datos de este servicio' })
      return
    }

    await dataupload.populate(['serviceId.technicalId'])

    const observation = await ObservationModel.findOne({ serviceId })
    if (dataupload.serviceId.serviceType === ServiceTypes.DESRATIZACIÓN) {
      if (!observation) {
        res.status(400).json({ succes: 'FAILED', message: 'No se encontraron los datos de este servicio' })
        return
      }
    }

    const payload = {
      dataupload,
      observation,
    }

    res.status(200).json({ success: 'OK', payload, message: 'Información obtenida correctamente' })
    return
  } catch (err) {
    res.status(500).json({ succes: 'FAILED', message: 'Error del servidor' })
    return
  }
}

export const uploadImagesDataupload = async (
  req: Request<{ datauploadId: string }, {}, UploadImageDatauploadDTO>,
  res: Response
) => {
  try {
    console.log(req.body)

    if (req.body.images.length <= 0) {
      res.status(400).json({ succes: 'FAILED', message: 'No se cargaron imágenes para este servicio' })
      return
    }

    await ServiceDataUploadModel.findByIdAndUpdate(req.params.datauploadId, { images: req.body.images })

    res.status(200).json({ success: 'OK', message: 'Imágenes cargadas correctamente' })
    return
  } catch (err) {
    res.status(500).json({ succes: 'FAILED', message: 'Error del servidor' })
    return
  }
}

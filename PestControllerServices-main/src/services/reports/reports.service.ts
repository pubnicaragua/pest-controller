import { Request, Response } from 'express'
import {
  DatauploadServiceAgreggate,
  getDatauploadGroupServicesByClientAndType,
  groupClients,
  groupServiceByTypeAggregate,
} from '../../helpers/aggregates/reports.aggregates'
import { ServiceTypes } from '../../schemas/service/service.schema'
import { ObservationModel } from '../../schemas/observation/observation.schema'

export const getInitialReports = async (req: Request<{}, {}, {}, { clientId?: string }>, res: Response) => {
  try {
    const { clientId } = req.query

    const clients = await groupClients()
    const services = await groupServiceByTypeAggregate(clientId ?? '')

    const clientMoreServices = clients.length > 5 ? clients.slice(0, 4) : clients

    let principalServices: {}[] = []
    let countOtherServices: number = 0

    services.forEach(service => {
      if (
        service._id.serviceType === ServiceTypes.DESRATIZACIÓN ||
        service._id.serviceType === ServiceTypes.DESINFECCIÓN ||
        service._id.serviceType === ServiceTypes.DESINSECTACIÓN
      ) {
        principalServices.push(service)
      } else {
        countOtherServices += service.count
      }
    })

    principalServices.push({ _id: { serviceType: 'OTROS' }, count: countOtherServices })

    const payload = {
      services: principalServices,
      clients: clientMoreServices,
    }

    res.status(200).json({
      success: 'OK',
      payload,
      message: 'Información obtenida correctamente',
    })
  } catch (err) {
    res.status(500).json({ succes: 'FAILED', message: 'Error del servidor' })
    return
  }
}

export const reportsByClient = async (
  req: Request<{ clientId: string }, {}, {}, { serviceType: ServiceTypes }>,
  res: Response
) => {
  try {
    const { clientId } = req.params
    const { serviceType } = req.query

    const results = (await getDatauploadGroupServicesByClientAndType(
      clientId,
      serviceType
    )) as DatauploadServiceAgreggate[]

    let payload = []
    for (const key in results) {
      const observations = await ObservationModel.findOne({ serviceId: results[key].serviceId })
      payload.push({
        ...results[key],
        total: (observations?.total?.gnawed ?? 0) + (observations?.total?.rodentSample ?? 0) || 0,
      })
    }

    res.status(200).json({
      success: 'OK',
      payload,
      message: 'Información obtenida correctamente',
    })
  } catch (err) {
    res.status(500).json({ succes: 'FAILED', message: 'Error del servidor' })
    return
  }
}

import { ObservationDTO } from '../schemas/observation/observation.dto'
import { Activity, ObservationModel } from '../schemas/observation/observation.schema'
import { Service } from '../schemas/service/service.schema'
import { uploadImage } from './cloudinary.helper'

export const saveObservation = async (service: Service, observations: ObservationDTO): Promise<string> => {
  try {
    const exists = await ObservationModel.findOne({ serviceId: service._id })
    if (exists) {
      return 'Ya eiste el registro de observaciones para este servicio'
    }

    const { activities } = observations

    const payload = {
      ...observations,
      serviceId: service._id,
      activities: activities.length > 0 ? activities : [],
    }

    const obs = await ObservationModel.create(payload)
    await obs.save()

    return 'OK'
  } catch (err) {
    return `No se pudo realizar la carga de observaciones. Error: ${err}`
  }
}

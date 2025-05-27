import { ServiceModel, ServiceStatus } from '../../schemas/service/service.schema'
import dayjs from 'dayjs'

export const checkDateService = async () => {
  const services = await ServiceModel.find({})
  services.forEach(async service => {
    if (service.status === ServiceStatus.PENDING) {
      if (dayjs(service.serviceDate).isBefore(dayjs())) {
        await service.updateOne({ status: ServiceStatus.OVERDUE })
      }
    }
  })
}

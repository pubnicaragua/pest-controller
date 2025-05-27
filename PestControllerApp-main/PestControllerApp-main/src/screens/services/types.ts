import { Service, ServiceDevices, ServiceProducts } from '@/api/services/type'
import { UserRole } from '@/api/users/type'

export type ServiceDetailScreenProps = {
  role: UserRole
  service: Service
  refreshService: () => void
}

export type ExecuteServiceScreenProps = {
  service: Service
  products: ServiceProducts[]
  devices: ServiceDevices[]
}

import { Client } from '@/api/client/type'
import { Activity } from '@/api/dataupload/type'
import {
  Device,
  Product,
  Service,
  ServiceStatus,
  ServiceTypes,
  ServiceUrgency,
} from '@/api/services/type'
import { User } from '@/api/users/type'
import { Control } from 'react-hook-form'

export type StatusBadgeProps = {
  status: ServiceStatus
}

export type UrgencyBadgeProps = {
  urgency: ServiceUrgency
}

export type GeneralInformationSectionProps = {
  service: Service
}

export type ClientInformationSectionProps = {
  client: Client
}

export type TechnicalInformationSectionProps = {
  technical: User
}

export type UpdateServiceModalProps = {
  visible: boolean
  onClose: () => void
  service: Service
  refreshService: () => void
}

export type ServiceTypeSectionProps = {
  control: Control
  section: ServiceTypes | 'CUSTOM'
  service: Service
  products?: Product[]
  devices?: Device[]
  handleOnShowModal?: () => void
  obsDetail?: Activity[]
}

export type ObservationsModalProps = {
  title: string
  visible: boolean
  onClose: () => void
  setObsFinal: (observations: ActivityPayloadModal[]) => void
}

export type ActivityPayloadModal = {
  ec: number
  obs: number
  detail?: string
  image?: { file: File; blob: string }
}

export type ServiceCardProps = {
  services: Service[]
  handleToSeeDetail: (serviceId: string) => void
}

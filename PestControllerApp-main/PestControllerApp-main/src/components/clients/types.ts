import { Client } from '@/api/client/type'

export type ClientSectionProps = {
  client: Client
}

export type UpdateClientModalProps = {
  visible: boolean
  onClose: () => void
  client: Client
  refreshClient: () => void
}

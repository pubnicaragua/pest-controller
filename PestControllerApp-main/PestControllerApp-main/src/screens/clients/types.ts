import { Client } from '@/api/client/type'

export type ClientDetailScreenProps = {
  client: Client
  refreshClient: () => void
}

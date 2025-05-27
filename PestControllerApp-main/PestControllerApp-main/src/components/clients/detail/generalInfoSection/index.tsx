import { LineDividerUI } from '../../../../../packages/components'
import { ClientSectionProps } from '../../types'

const GeneralInfoSection: React.FC<ClientSectionProps> = ({ client }) => {
  return (
    <div className="mb-5 flex flex-wrap gap-y-4">
      <span className="font-semibold text-lg basis-full">Información general del cliente</span>
      <div className="basis-1/2">
        <span className="font-semibold mr-2">Cliente:</span>
        <span>{client.businessName}</span>
      </div>
      <div className="basis-1/2">
        <span className="font-semibold mr-2">RUT:</span>
        <span>{client.rut}</span>
      </div>
      <div className="basis-1/2">
        <span className="font-semibold mr-2">Servicio realizados:</span>
        <span>{client.totalServices}</span>
      </div>
      <div className="basis-full md:basis-1/2">
        <span className="font-semibold mr-2">Posee servicio pendiente:</span>
        <span>{client.pendingService ? 'SI' : 'NO'}</span>
      </div>
      <div className="basis-full">
        <span className="font-semibold mr-2 block">Dirección</span>
        <span>{client.address}</span>
      </div>
      <LineDividerUI />
    </div>
  )
}

export default GeneralInfoSection

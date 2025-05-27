import { LineDividerUI } from '../../../../../packages/components'
import { ClientInformationSectionProps } from '../../types'

const ClientInformationSection: React.FC<ClientInformationSectionProps> = ({ client }) => {
  return (
    <div className="flex flex-wrap gap-y-4 mb-5">
      <span className="font-semibold text-lg basis-full">Información del cliente beneficiado</span>
      <div className="basis-full lg:basis-1/2">
        <span className="font-semibold mr-2">Cliente:</span>
        <span>{client.businessName}</span>
      </div>
      <div className="basis-full lg:basis-1/2">
        <span className="font-semibold mr-2">RUT:</span>
        <span>{client.rut}</span>
      </div>
      <div className="basis-full lg:basis-1/2">
        <span className="font-semibold mr-2">Contacto:</span>
        <span>{client.contact}</span>
      </div>
      <div className="basis-full lg:basis-1/2">
        <span className="font-semibold mr-2 block">Correo electrónico</span>
        <span>{client.email}</span>
      </div>
      <LineDividerUI />
    </div>
  )
}

export default ClientInformationSection

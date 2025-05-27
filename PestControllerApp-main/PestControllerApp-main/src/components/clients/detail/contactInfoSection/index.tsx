import { LineDividerUI } from '../../../../../packages/components'
import { ClientSectionProps } from '../../types'

const ContactInfoSection: React.FC<ClientSectionProps> = ({ client }) => {
  return (
    <div className="mb-5 flex flex-wrap gap-y-4">
      <span className="font-semibold text-lg basis-full">Información del contacto</span>
      <div className="basis-full md:basis-1/2">
        <span className="font-semibold mr-2 block">Nombre y apellido</span>
        <span>{client.contact}</span>
      </div>
      <div className="basis-full md:basis-1/2">
        <span className="font-semibold mr-2 block">Correo electrónico</span>
        <span>{client.email}</span>
      </div>
      <LineDividerUI />
    </div>
  )
}

export default ContactInfoSection

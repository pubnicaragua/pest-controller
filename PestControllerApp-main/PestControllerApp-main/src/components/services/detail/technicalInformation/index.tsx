import { TechnicalInformationSectionProps } from '../../types'

const TechnicalInformationSection: React.FC<TechnicalInformationSectionProps> = ({ technical }) => {
  return (
    <div className="flex flex-wrap gap-y-4">
      <span className="font-semibold text-lg basis-full">Información del técnico encargado</span>
      <div className="basis-full lg:basis-1/2">
        <span className="font-semibold mr-2">Nombre:</span>
        <span>{`${technical.name} ${technical.lastname}`}</span>
      </div>
      <div className="basis-full lg:basis-1/2">
        <span className="font-semibold mr-2">RUT:</span>
        <span>{technical.rut}</span>
      </div>
      <div className="basis-full lg:basis-1/2">
        <span className="font-semibold mr-2 block">Correo electrónico</span>
        <span>{technical.email}</span>
      </div>
    </div>
  )
}

export default TechnicalInformationSection

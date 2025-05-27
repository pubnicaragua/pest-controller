import { ServiceStatus, ServiceTypes } from '@/api/services/type'
import {
  ControlledChecklistInputUI,
  ControlledTextareaUI,
  LineDividerUI,
} from '../../../../../packages/components'
import { Controller } from 'react-hook-form'
import { ServiceTypeSectionProps } from '../../types'
import { ObservationsList } from '@/constants/observations'
import { TranslateObsTotal } from '@/api/dataupload/type'
import ObservationsDetail from '../../obsDetail'

const ServiceTypeSection: React.FC<ServiceTypeSectionProps> = ({
  control,
  section,
  service,
  products,
  devices,
  obsDetail,
  handleOnShowModal,
}) => {
  if (section === 'CUSTOM') {
    return (
      <div className="py-3 flex flex-col gap-5">
        <h3 className={`text- font-semibold basis-full mb-2 text-primary`}>
          {service.serviceType.toUpperCase()}
        </h3>
        <Controller
          control={control}
          name="sites"
          render={({ field: { value, onChange } }) => (
            <div>
              <label className="text-lg font-semibold">Sitios tratados</label>
              <textarea
                name={'sites'}
                //  id={id}
                cols={30}
                rows={2}
                value={value}
                //  placeholder={placeholder}
                className="border border-gray-light rounded-md px-1 py-1 w-full"
                style={{ resize: 'none' }}
                onChange={onChange}
              ></textarea>
            </div>
          )}
        />
        <Controller
          control={control}
          name="description"
          render={({ field: { value, onChange } }) => (
            <div>
              <label className="text-lg font-semibold">Observaciones y sugerencias</label>
              <textarea
                name={'description'}
                //  id={id}
                cols={30}
                rows={4}
                value={value}
                //  placeholder={placeholder}
                className="border border-gray-light rounded-md px-1 py-1 w-full"
                style={{ resize: 'none' }}
                onChange={onChange}
              ></textarea>
            </div>
          )}
        />
      </div>
    )
  }

  return (
    <>
      <div>
        <div className="flex flex-wrap my-5">
          <div className="basis-full lg:basis-2/5">
            <h3
              className={`text-base font-semibold basis-full mb-2 ${
                section === service.serviceType ? 'text-primary' : 'text-text'
              }`}
            >
              {section}
            </h3>
            {section !== ServiceTypes.DESRATIZACIÓN && (
              <>
                <div className="flex gap-2">
                  <span>Dosis</span>
                  <ControlledChecklistInputUI
                    control={control}
                    name={service.serviceType + '-dosage'}
                    border="underlined"
                  />
                  <span>cc /</span>
                  <ControlledChecklistInputUI
                    control={control}
                    name={service.serviceType + '-water'}
                    border="underlined"
                  />
                  <span>Lts. agua</span>
                </div>

                {devices && (
                  <div className="mr-6 my-3">
                    <LineDividerUI />
                  </div>
                )}
              </>
            )}
            <div className="flex flex-col gap-2 w-full">
              {section === ServiceTypes.DESINSECTACIÓN && (
                <span className="font-semibold">Lámparas ultravioletas</span>
              )}
              {devices &&
                devices.map(device => (
                  <ControlledChecklistInputUI
                    key={String(device)}
                    control={control}
                    name={String(device)}
                    border="outlined"
                    label={String(device)}
                  />
                ))}
            </div>
          </div>
          <div className="flex flex-col gap-2 basis-full mt-4 lg:basis-3/5 lg:mt-0">
            <Controller
              control={control}
              name={'product'}
              render={({ field: { value, onChange } }) => (
                <>
                  {products.map(product => (
                    <div key={product._id} className="flex gap-1">
                      <div className="flex items-start lg:items-center gap-2">
                        <input
                          type="radio"
                          name={'product'}
                          value={product.name}
                          onChange={onChange}
                          checked={value === product.name}
                        />
                        <div className="flex flex-col lg:flex-row">
                          <span className="font-semibold">{product.name}</span>
                          {product.description && <span>({product.description})</span>}
                          {product.risp && <span>({product.risp})</span>}
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}
            />
            {section === ServiceTypes.DESRATIZACIÓN && (
              <>
                <LineDividerUI />
                <div className="flex flex-col my-3">
                  <div className="flex flex-col flex-wrap gap-x-4 gap-2 md:max-h-40">
                    {ObservationsList.map((obs, i) => {
                      const counter = i + 1
                      const label = TranslateObsTotal[obs]

                      return (
                        <div key={obs} className="flex justify-between">
                          <span>{`${counter} | ${label}`}</span>
                          <span>
                            <ControlledChecklistInputUI control={control} name={obs} />
                          </span>
                        </div>
                      )
                    })}
                    <div className="flex justify-between">
                      <span>PUNTOS INSTALADOS</span>
                      <span>
                        <ControlledChecklistInputUI control={control} name="installedPoints" />
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>TOTAL SIN ACTIVIDAD</span>
                      <span>
                        <ControlledChecklistInputUI control={control} name="noActivityTotal" />
                      </span>
                    </div>
                  </div>
                  {service.status !== ServiceStatus.DONE && (
                    <div className="flex justify-end mt-3">
                      <button
                        className="btn secondary"
                        type="button"
                        onClick={() => handleOnShowModal()}
                      >
                        Detalle
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
        <LineDividerUI />
        {section === ServiceTypes.DESRATIZACIÓN && service.status === ServiceStatus.DONE && (
          <ObservationsDetail observations={obsDetail} />
        )}
        <div className="py-3 flex flex-col gap-5">
          <ControlledTextareaUI control={control} name="sites" label="Sitios tratados" />
          <ControlledTextareaUI
            control={control}
            name="description"
            label="Descripción del servicio y sugerencias"
          />
        </div>
      </div>
    </>
  )
}

export default ServiceTypeSection

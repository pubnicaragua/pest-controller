import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { api } from '@/api'
import {
  ButtonUI,
  ControlledInputUI,
  ControlledSelectUI,
  ModalUI,
} from '../../../../packages/components'
import { UpdateServiceModalProps } from '../types'
import { Client } from '@/api/client/type'
import toast from 'react-hot-toast'
import ControlledDatePickerUI from '../../../../packages/components/ControlledDatePickerUI'
import dayjs from 'dayjs'
import {
  clientOptions,
  needVisitOptions,
  serviceTypeOptions,
  serviceUrgencyOptions,
  technicalOptions,
} from '@/constants/selectOptions'
import { ResponseDataState } from '@/api/types'
import { User } from '@/api/users/type'
import { ScheduleServicePayload } from '@/api/services/type'

const UpdateServiceModal: React.FC<UpdateServiceModalProps> = ({
  visible,
  onClose,
  service,
  refreshService,
}) => {
  const [technicals, setTechnicals] = useState<ResponseDataState<User[]>>({
    data: [],
    isLoading: true,
  })
  const [clients, setClients] = useState<ResponseDataState<Client[]>>({ data: [], isLoading: true })
  const [priorVisit, setPriorVisit] = useState<boolean>()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()

  const onSubmit = data => {
    update(data)
  }

  const update = async (payload: ScheduleServicePayload) => {
    setIsLoading(true)
    const response = await api.services.updateService(service._id, payload)
    if (response.status === 200) {
      setIsLoading(false)
      toast.success(response.message)
      refreshService()
      onClose()
    } else {
      setIsLoading(false)
      toast.error(response.message)
      onClose()
    }
  }

  const clientsList = async () => {
    const response = await api.clients.getClientsList<Client[]>()
    if (response.status === 200) {
      setClients({ data: response.data, isLoading: false })
    } else {
      setClients({ data: [], isLoading: false })
      toast.error(response.message)
    }
  }

  const technicalList = async () => {
    const response = await api.users.getTechnicals<User[]>()
    if (response.status === 200) {
      setTechnicals({ data: response.data, isLoading: false })
    } else {
      setTechnicals({ data: [], isLoading: false })
      toast.error(response.message)
    }
  }

  useEffect(() => {
    clientsList()
    technicalList()
  }, [])

  useEffect(() => {
    for (const key in service) {
      setValue(key, service[key])
    }
    setValue('clientId', service['clientId']?._id)
    setValue('technicalId', service['technicalId']?._id || '')
  }, [service, setValue])

  return (
    <ModalUI title="Información del servicio" visible={visible} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col lg:gap-3 lg:flex-row">
          <ControlledSelectUI
            control={control}
            name="clientId"
            label="Cliente"
            placeholder="Seleccione un cliente"
            error={errors.clientId}
            options={clientOptions(clients.data)}
          />
          <ControlledInputUI
            control={control}
            name="address"
            label="Dirección"
            inputType="text"
            error={errors.address}
          />
        </div>
        <div className="flex flex-col lg:gap-3 lg:flex-row">
          <ControlledSelectUI
            control={control}
            name="serviceType"
            label="Tipo de servicio"
            placeholder="Selecione el tipo del servicio"
            error={errors.serviceType}
            options={serviceTypeOptions()}
          />
          <ControlledSelectUI
            control={control}
            name="urgency"
            label="Urgencia"
            placeholder="Selecione la urgencia del servicio"
            error={errors.urgency}
            options={serviceUrgencyOptions()}
          />
        </div>
        <div className="flex flex-col lg:gap-3 lg:flex-row">
          <ControlledSelectUI
            control={control}
            name="needVisit"
            label="Visita previa"
            error={errors.needVisit}
            placeholder="Necesita visita previa?"
            handleOnClick={value => setPriorVisit(value === 'SI' ? true : false)}
            options={needVisitOptions()}
          />
          {priorVisit && (
            <ControlledDatePickerUI
              control={control}
              name="visitDate"
              label="Fecha a realizar la visita previa"
              date={dayjs()}
              error={errors.visitDate}
            />
          )}
        </div>
        <div className="flex flex-col lg:gap-3 lg:flex-row">
          <ControlledDatePickerUI
            control={control}
            name="serviceDate"
            label="Fecha a realizar el servicio"
            date={dayjs()}
            error={errors.serviceDate}
          />
          <ControlledInputUI
            control={control}
            name="budget"
            label="Presupuesto"
            inputType="number"
            error={errors.budget}
          />
        </div>
        <ControlledSelectUI
          control={control}
          name="technicalId"
          label="Técnico encargado"
          placeholder="Seleccione al técnico"
          error={errors.technicalId}
          options={technicalOptions(technicals.data)}
        />
        <ControlledInputUI
          control={control}
          name="observations"
          label="Observaciones"
          inputType="text"
          error={errors.observations}
        />

        <div className="flex justify-center">
          <ButtonUI text="Actualizar" type="submit" isLoading={isLoading} />
        </div>
      </form>
    </ModalUI>
  )
}

export default UpdateServiceModal

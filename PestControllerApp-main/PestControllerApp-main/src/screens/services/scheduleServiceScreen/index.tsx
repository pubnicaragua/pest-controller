'use client'

import { useForm } from 'react-hook-form'
import { FormUI } from '../../../../packages/components/formUI'
import {
  ButtonUI,
  ControlledInputUI,
  ControlledSelectUI,
  LoadingUI,
} from '../../../../packages/components'
import { ScheduleServicePayload } from '@/api/services/type'
import { api } from '@/api'
import { yupResolver } from '@hookform/resolvers/yup'
import { ScheduleServiceSchema } from '@/resolvers/scheduleServiceResolver'
import { useEffect, useState } from 'react'
import { User } from '@/api/users/type'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import ControlledDatePickerUI from '../../../../packages/components/ControlledDatePickerUI'
import dayjs from 'dayjs'
import { Client } from '@/api/client/type'
import { ResponseDataState } from '@/api/types'
import {
  clientOptions,
  needVisitOptions,
  serviceTypeOptions,
  serviceUrgencyOptions,
  technicalOptions,
} from '@/constants/selectOptions'
import { useSession } from '@/contexts/session'

const ScheduleServiceScreen: React.FC = () => {
  const [technicals, setTechnicals] = useState<ResponseDataState<User[]>>({
    data: [],
    isLoading: true,
  })
  const [clients, setClients] = useState<ResponseDataState<Client[]>>({ data: [], isLoading: true })
  const [priorVisit, setPriorVisit] = useState<boolean>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [serviceType, setServiceType] = useState('')
  const [clientSelected, setClientSelected] = useState<Client>()

  const router = useRouter()
  const {
    session: { isMobile },
  } = useSession()

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(ScheduleServiceSchema),
  })

  const onSubmit = data => {
    const payload: ScheduleServicePayload = {
      ...data,
      needVisit: priorVisit,
      visitDate: priorVisit ? data.visitDate : data.serviceDate,
      serviceType: serviceType !== 'PERSONALIZADO' ? data.serviceType : data.serviceTypeOther,
    }

    scheduleService(payload)
  }

  const scheduleService = async (payload: ScheduleServicePayload) => {
    setIsLoading(true)
    const response = await api.services.scheduleService(payload)
    if (response.status === 201) {
      toast.success(response.message)
      router.push('/services')
    } else {
      toast.error(response.message)
    }
    setIsLoading(false)
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

  const handleChangeServiceType = (value: string) => setServiceType(value)

  const handleClientSelected = (clientId: string) => {
    const selected = clients.data.find(client => client._id === clientId)
    setClientSelected(selected)
  }

  useEffect(() => {
    clientsList()
    technicalList()
  }, [])

  useEffect(() => {
    if (clientSelected) {
      const address = `${clientSelected.region}, ${clientSelected.commune}, ${clientSelected.address}`
      setValue('address', address)
    }
  }, [clientSelected, setValue])

  if (clients.isLoading || technicals.isLoading) return <LoadingUI />

  return (
    <FormUI title="Agendar servicio" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col lg:gap-3 lg:flex-row max-w-[95vw]">
        <ControlledSelectUI
          control={control}
          name="clientId"
          label="Cliente"
          placeholder="Seleccione un cliente"
          error={errors.clientId}
          handleOnClick={client => handleClientSelected(client)}
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
          handleOnClick={value => handleChangeServiceType(value)}
        />
        {serviceType === 'PERSONALIZADO' && isMobile && (
          <div className="flex flex-col lg:gap-3 lg:flex-row">
            <ControlledInputUI
              control={control}
              name="serviceTypeOther"
              label=""
              inputType="text"
              error={errors.serviceTypeOther}
            />
          </div>
        )}
        <ControlledSelectUI
          control={control}
          name="urgency"
          label="Urgencia"
          placeholder="Selecione la urgencia del servicio"
          error={errors.urgency}
          options={serviceUrgencyOptions()}
        />
      </div>
      {serviceType === 'PERSONALIZADO' && !isMobile && (
        <div className="flex flex-col lg:gap-3 lg:flex-row">
          <ControlledInputUI
            control={control}
            name="serviceTypeOther"
            label=""
            inputType="text"
            error={errors.serviceTypeOther}
          />
        </div>
      )}
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
          leftAddon="$"
          addon={'CLP'}
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
        <ButtonUI text="Agendar" type="submit" isLoading={isLoading} disabled={isLoading} />
      </div>
    </FormUI>
  )
}

export default ScheduleServiceScreen

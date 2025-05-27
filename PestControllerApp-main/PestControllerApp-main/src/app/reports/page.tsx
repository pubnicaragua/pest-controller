'use client'

import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { api } from '@/api'
import toast from 'react-hot-toast'
import { ResponseDataState } from '@/api/types'
import {
  AreaChartUI,
  ContainerListUI,
  LoadingUI,
  PieChartUI,
  SelectUI,
} from '../../../packages/components'
import { ClientReport, PestsReport, Reports, ServiceReport } from '@/api/reports/types'
import { formatPestReport, renderCustomizedLabel } from '@/libs/recharts'
import { clientOptions, pestTypeOptions } from '@/constants/selectOptions'
import { Client } from '@/api/client/type'
import { ServiceTypes } from '@/api/services/type'
import { capitalizeString } from '@/libs/strings'
import { useSession } from '@/contexts/session'

const ReportsPage: NextPage = () => {
  const [reports, setReports] = useState<ResponseDataState<Reports>>({
    data: null,
    isLoading: true,
  })
  const [serviceData, setServiceData] = useState<ServiceReport[]>([])
  const [clientData, setClientData] = useState<ClientReport[]>([])
  const [pestsData, setPestsData] = useState<PestsReport[]>([])
  const [showFilters, setShowFilters] = useState<boolean>(false)
  const [filters, setFilters] = useState({ client: '', type: '' })
  const [clients, setClients] = useState<ResponseDataState<Client[]>>({ data: [], isLoading: true })

  const { session } = useSession()

  const getReports = async (clientId?: string) => {
    const response = await api.reports.getReports<Reports>(clientId)
    if (response.status === 200) {
      setReports({ data: response.data, isLoading: false })
      setServiceData(response.data.services)
      setClientData(response.data.clients)
    } else {
      toast.error(response.message)
    }
  }

  const getPestsReports = async (clientId: string, serviceType: ServiceTypes) => {
    const response = await api.reports.getPestByClientReports<PestsReport[]>(clientId, serviceType)
    if (response.status === 200) {
      setPestsData(response.data)
    } else {
      toast.error(response.message)
    }
  }

  const formatServices = () => {
    return serviceData.map(service => ({ name: service._id.serviceType, value: service.count }))
  }

  const formatClients = () => {
    return clientData.map(client => ({ name: client.businessName, value: client.totalServices }))
  }

  const clientsList = async (searchValue: string = '') => {
    const response = await api.clients.getClientsList<Client[]>(searchValue)
    if (response.status === 200) {
      setClients({ data: response.data, isLoading: false })
    } else {
      setClients({ data: [], isLoading: false })
      toast.error(response.message)
    }
  }

  const handleShowFilters = () => setShowFilters(prevState => !prevState)

  const handleOnChangeFilters = (ev: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters(prevState => ({
      ...prevState,
      [ev.target.name]: ev.target.value,
    }))

    handleShowFilters()
  }

  useEffect(() => {
    clientsList()
  }, [])

  useEffect(() => {
    getReports(filters.client)
  }, [filters.client])

  useEffect(() => {
    if (filters.client && filters.type) {
      getPestsReports(filters.client, filters.type as ServiceTypes)
    }
  }, [filters.client, filters.type])

  if (reports.isLoading || clients.isLoading) return <LoadingUI />

  return (
    <ContainerListUI
      title="Estadísticas"
      description="Aquí puede visualizar los gráficos para analizar la información que se encuentra en la plataforma"
      isMobile={session.isMobile}
      showFilters={showFilters}
      onShowFilters={() => handleShowFilters()}
      filters={
        <>
          <SelectUI
            label="Cliente"
            name="client"
            placeholder="Todo"
            value={filters.client}
            onChange={handleOnChangeFilters}
            options={clientOptions(clients.data)}
          />
          <SelectUI
            label="Tipo de plaga"
            name="type"
            placeholder="Todo"
            value={filters.type}
            onChange={handleOnChangeFilters}
            options={pestTypeOptions()}
          />
        </>
      }
    >
      <div className="w-full h-full">
        {(!filters.client || !filters.type) && (
          <div className="flex gap-3 w-full h-full flex-col lg:flex-row">
            <div className="flex flex-col basis-full lg:basis-1/2 bg-white p-2 rounded-lg h-2/3">
              <label className="text-2xl font-semibold">Servicios realizados</label>
              <PieChartUI data={formatServices()} label={renderCustomizedLabel} />
            </div>
            {!filters.client && (
              <div className="flex flex-col basis-full lg:basis-1/2 bg-white p-2 rounded-lg h-2/3">
                <label className="text-2xl font-semibold">Clientes frecuentes</label>
                <PieChartUI
                  data={formatClients()}
                  label={renderCustomizedLabel}
                  labelTooltip="Servicios totales"
                />
              </div>
            )}
          </div>
        )}
        {filters.client && filters.type && (
          <div className="flex gap-3 w-full h-full">
            <div className="flex flex-col basis-full bg-white p-2 rounded-lg h-2/3 min-h-fit">
              <div className="ml-4 mb-4 flex flex-col">
                <label className="text-2xl font-semibold">{pestsData[0]?.clientName}</label>
                <label className="text-lg font-semibold">{capitalizeString(filters.type)}</label>
              </div>
              <AreaChartUI data={formatPestReport(pestsData)} />
            </div>
          </div>
        )}
      </div>
    </ContainerListUI>
  )
}

export default ReportsPage

'use client'

import { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Service } from '@/api/services/type'
import { api } from '@/api'
import { ContainerListUI, LoadingUI, SelectUI, TableUI } from '../../../packages/components'
import { ResponseDataState } from '@/api/types'
import toast from 'react-hot-toast'
import { getColumns } from '@/screens/services/table/constants'
import { useDebounce } from '@/libs/useDebounce'
import SearchInput from '@/components/searchInput'
import { serviceStatusOptions, serviceUrgencyOptions } from '@/constants/selectOptions'
import { UserRole } from '@/api/users/type'
import { useSession } from '@/contexts/session'
import ServiceCard from '@/components/services/mobileCard'

const ServicesPage: NextPage = () => {
  const [services, setServices] = useState<ResponseDataState<Service[]>>({
    data: [],
    isLoading: true,
  })
  const [searchValue, setSearchValue] = useState<string>('')
  const [showFilters, setShowFilters] = useState<boolean>(false)
  const [filters, setFilters] = useState({ urgency: '', status: '' })

  const { session } = useSession()
  const router = useRouter()

  const debounceValue = useDebounce(searchValue)

  const toScheduleService = () => router.push('/services/schedule')

  const toSeeDetail = (_id: string) => {
    router.push(`/services/${_id}`)
  }

  const servicesList = async (searchValue: string = '') => {
    const response = await api.services.getServicesList<Service[]>(
      searchValue,
      filters.urgency,
      filters.status
    )
    if (response.status === 200) {
      setServices({ data: response.data, isLoading: false })
    } else {
      setServices({ data: [], isLoading: false })
      toast.error(response.message)
    }
  }

  const handleOnSearch = (value: string) => {
    setSearchValue(value)
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
    servicesList(debounceValue)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceValue, filters.urgency, filters.status])

  if (services.isLoading) return <LoadingUI />

  return (
    <ContainerListUI
      title="Servicios"
      description={
        session.role !== UserRole.TECHNICAL
          ? 'Aquí puede observar el historial de todos los servicios pendientes, vencidos y vencidos pendiente'
          : 'Aquí puede observar los servicios pendientes'
      }
      addBtnText={session.role !== UserRole.TECHNICAL ? 'Agendar servicio' : null}
      handleOnClick={() => toScheduleService()}
      searchInput={<SearchInput value={searchValue} onChange={handleOnSearch} />}
      showFilters={showFilters}
      onShowFilters={() => handleShowFilters()}
      isMobile={session.isMobile}
      filters={
        <>
          <SelectUI
            label="Urgencia"
            name="urgency"
            placeholder="Todo"
            value={filters.urgency}
            onChange={handleOnChangeFilters}
            options={serviceUrgencyOptions()}
          />
          <SelectUI
            label="Estado"
            name="status"
            placeholder="Todo"
            value={filters.status}
            onChange={handleOnChangeFilters}
            options={serviceStatusOptions()}
          />
        </>
      }
    >
      {session.isMobile ? (
        <ServiceCard services={services.data ?? []} handleToSeeDetail={toSeeDetail} />
      ) : (
        <TableUI columns={getColumns(toSeeDetail)} data={services.data ?? []} />
      )}
    </ContainerListUI>
  )
}

export default ServicesPage

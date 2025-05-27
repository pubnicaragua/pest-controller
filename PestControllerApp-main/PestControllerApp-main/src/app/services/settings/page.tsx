'use client'

import { NextPage } from 'next'
import { ContainerListUI } from '../../../../packages/components'
import ProductsTable from '@/screens/serviceSettings/productsTable'

const ServiceSettingsPage: NextPage = () => {
  return (
    <ContainerListUI
      title="Ajuste de servicios"
      description="Aquí puede modificar los datos generales para los servicios"
    >
      <ProductsTable />
    </ContainerListUI>
  )
}

export default ServiceSettingsPage

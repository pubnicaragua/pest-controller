import { ServiceTypes } from '../service/service.schema'

export type CreateServiceProductsDTO = {
  serviceType: ServiceTypes
  products: { name: string; description?: string }[]
}

export type AddProductDTO = {
  serviceType: ServiceTypes
  product: {
    name: string
    description: string
    risp: string
  }
}

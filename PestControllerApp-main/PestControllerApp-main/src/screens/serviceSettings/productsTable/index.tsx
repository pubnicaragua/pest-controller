import { useEffect, useState } from 'react'
import {
  ControlledInputUI,
  IconButtonUI,
  LineDividerUI,
  LoadingUI,
} from '../../../../packages/components'
import { api } from '@/api'
import { Product, ProductPayload, ServiceProducts, ServiceTypes } from '@/api/services/type'
import { ResponseDataState } from '@/api/types'
import toast from 'react-hot-toast'
import { EditIcon, PlusIcon, TrashIcon } from '../../../../packages/icons'
import { colors } from '../../../../tailwind.config'
import { useForm } from 'react-hook-form'

const ProductsTable: React.FC = () => {
  const [isEditable, setIsEditable] = useState<boolean>(false)
  const [productSeleted, setProductSelected] = useState<Product>({} as Product)
  const [addProduct, setAddProduct] = useState<{ serviceType: ServiceTypes; show: boolean }>({
    serviceType: null,
    show: false,
  })
  const [products, setProducts] = useState<ResponseDataState<ServiceProducts[]>>({
    data: [],
    isLoading: true,
  })

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm()

  const getServiceProducts = async () => {
    setProducts({ data: [], isLoading: true })
    const response = await api.services.getProductsService<ServiceProducts[]>()
    if (response.status === 200) {
      setProducts({ data: response.data, isLoading: false })
    } else {
      setProducts({ data: [], isLoading: false })
      toast.error(response.message)
    }
  }

  const onSubmit = data => {
    const payload: ProductPayload = {
      product: {
        ...data,
      },
      serviceType: addProduct.serviceType,
    }

    if (isEditable) editProduct(payload)
    else createProduct(payload)
  }

  const createProduct = async (payload: ProductPayload) => {
    const response = await api.services.addProductService(payload)
    if (response.status === 201) {
      resetValues()
      toast.success(response.message)
      getServiceProducts()
      hideAddField()
    } else {
      toast.error(response.message)
    }
  }

  const removeProduct = async (id: string, serviceType: ServiceTypes) => {
    const response = await api.services.removeProductService(id, serviceType)
    if (response.status === 200) {
      toast.success(response.message)
      getServiceProducts()
    } else {
      toast.error(response.message)
    }
  }

  const showProductInfoEdit = (product: Product, serviceType: ServiceTypes) => {
    setIsEditable(true)
    setValue('name', product.name ?? '')
    setValue('description', product.description ?? '')
    setValue('risp', product.risp ?? '')
    handleShowAddProduct(serviceType)
    setProductSelected(product)
  }

  const editProduct = async (payload: ProductPayload) => {
    const response = await api.services.updateProductService(productSeleted._id, payload)
    if (response.status === 200) {
      resetValues()
      toast.success(response.message)
      getServiceProducts()
      setIsEditable(false)
      hideAddField()
    } else {
      toast.error(response.message)
    }
  }

  const handleShowAddProduct = (type: ServiceTypes) => {
    setAddProduct({ serviceType: type, show: true })
  }

  const hideAddField = () => {
    setAddProduct({ serviceType: null, show: false })
  }

  const handleAddProduct = (type: ServiceTypes) => {
    handleShowAddProduct(type)
    setIsEditable(false)
    resetValues()
  }

  const resetValues = () => {
    setValue('name', '')
    setValue('description', '')
    setValue('risp', '')
  }

  useEffect(() => {
    getServiceProducts()
  }, [])

  if (products.isLoading) return <LoadingUI />

  return (
    <div>
      <div className="bg-white p-2 rounded-lg">
        <h2 className="text-lg font-semibold">Productos</h2>
        <div className="mt-3 p-2 shadow-xl border-solid border-[1px] border-primary-light rounded-lg h-full min-h-fit bg-white">
          {products.data.map(type => (
            <div key={type._id} className="mb-4">
              <div className="flex justify-between">
                <h3 className="text-primary font-semibold">{type.serviceType}</h3>
                <IconButtonUI
                  outlined={false}
                  icon={<PlusIcon width="24px" height="24px" fill={colors.primary.DEFAULT} />}
                  onClick={() => handleAddProduct(type.serviceType)}
                />
              </div>
              <div className="mt-3">
                {type.products.map(product => (
                  <div key={product._id} className="flex justify-between items-center">
                    <div className="flex py-1 gap-1">
                      <span>{product.name}</span>
                      {product.description && <span>({product.description})</span>}
                      {product.risp && <span>({product.risp})</span>}
                    </div>
                    <div className="flex items-center">
                      <IconButtonUI
                        outlined={false}
                        icon={<EditIcon width="16px" height="16px" fill={colors.blue.light} />}
                        onClick={() => showProductInfoEdit(product, type.serviceType)}
                      />
                      <IconButtonUI
                        outlined={false}
                        icon={<TrashIcon width="24px" height="24px" fill={colors.red.dark} />}
                        onClick={() => removeProduct(product._id, type.serviceType)}
                      />
                    </div>
                  </div>
                ))}
              </div>
              {addProduct.show && addProduct.serviceType === type.serviceType && (
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="flex gap-3 items-end">
                    <div className="basis-2/6">
                      <ControlledInputUI
                        control={control}
                        name="name"
                        label="Nombre"
                        error={errors?.name}
                      />
                    </div>
                    <div className="flex-1">
                      <ControlledInputUI
                        control={control}
                        name="description"
                        label="Descripción"
                        error={errors?.description}
                      />
                    </div>
                    <div className="basis-36">
                      <ControlledInputUI
                        control={control}
                        name="risp"
                        label="RISP"
                        error={errors?.risp}
                      />
                    </div>
                    <button className="bg-primary text-white p-2 rounded-lg">
                      {isEditable ? 'Actualizar' : 'Agregar'}
                    </button>
                  </div>
                </form>
              )}
              <LineDividerUI />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProductsTable

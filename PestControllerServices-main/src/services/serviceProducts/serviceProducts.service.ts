import { Request, Response } from 'express'
import { ServiceProductsModel } from '../../schemas/serviceProducts/serviceProducts.schema'
import { AddProductDTO, CreateServiceProductsDTO } from '../../schemas/serviceProducts/serviceProducts.dto'
import { ServiceTypes } from '../../schemas/service/service.schema'

export const createServiceProducts = async (req: Request<{}, {}, CreateServiceProductsDTO>, res: Response) => {
  try {
    const service = await ServiceProductsModel.create(req.body)
    await service.save()

    res.status(201).json({ success: 'OK', message: 'Productos agrgados correctamente' })
    return
  } catch (err) {
    res.status(500).json({ succes: 'FAILED', message: 'Error del servidor' })
    return
  }
}

export const getServiceProducts = async (req: Request, res: Response) => {
  try {
    const products = await ServiceProductsModel.find()
    if (!products) {
      res.status(400).json({ succes: 'FAILED', message: 'No se encontraron los productos para este servicio' })
      return
    }

    res.status(200).json({ success: 'OK', payload: products, message: 'Productos obtenidos correctamente' })
    return
  } catch (err) {
    res.status(500).json({ succes: 'FAILED', message: 'Error del servidor' })
    return
  }
}

export const addNewProduct = async (req: Request<{}, {}, AddProductDTO>, res: Response) => {
  try {
    const { serviceType, product } = req.body

    const data = await ServiceProductsModel.findOne({ serviceType })
    if (!data) {
      res.status(400).json({ succes: 'FAILED', message: 'No se encontraron los productos para este servicio' })
      return
    }

    const arrCopy = [...data.products, product]

    await data.updateOne({ products: arrCopy })

    res.status(201).json({ success: 'OK', message: 'Producto añadido correctamente' })
  } catch (err) {
    res.status(500).json({ succes: 'FAILED', message: 'Error del servidor' })
    return
  }
}

export const removeProduct = async (
  req: Request<{ productId: string }, {}, {}, { serviceType: ServiceTypes }>,
  res: Response
) => {
  try {
    const { productId } = req.params
    const { serviceType } = req.query

    const data = await ServiceProductsModel.findOne({ serviceType })
    if (!data) {
      res.status(400).json({ succes: 'FAILED', message: 'No se encontraron los productos para este servicio' })
      return
    }

    const arrCopy = [...data.products].filter(product => String(product._id) !== productId)

    await data.updateOne({ products: arrCopy })

    res.status(200).json({ success: 'OK', message: 'Producto eliminado correctamente' })
  } catch (err) {
    res.status(500).json({ succes: 'FAILED', message: 'Error del servidor' })
    return
  }
}

export const updateProduct = async (req: Request<{ productId: string }, {}, AddProductDTO>, res: Response) => {
  try {
    const { productId } = req.params
    const { serviceType, product: newProduct } = req.body

    const data = await ServiceProductsModel.findOne({ serviceType })
    if (!data) {
      res.status(400).json({ succes: 'FAILED', message: 'No se encontraron los productos para este servicio' })
      return
    }

    const arrCopy = [...data.products]
    arrCopy.forEach((product, i) => {
      if (String(product._id) === productId) {
        const edited = {
          _id: product._id,
          name: newProduct.name && newProduct.name,
          description: newProduct.description && newProduct.description,
          risp: newProduct.risp && newProduct.risp,
        }
        arrCopy[i] = edited
      }
    })
    await data.updateOne({ products: arrCopy })

    res.status(200).json({ success: 'OK', message: 'Producto actualizado correctamente' })
  } catch (err) {
    res.status(500).json({ succes: 'FAILED', message: 'Error del servidor' })
    return
  }
}

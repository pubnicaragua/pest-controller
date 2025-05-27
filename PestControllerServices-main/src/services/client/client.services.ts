import { Request, Response } from 'express'
import { RegisterClientDTO, UpdateClientDTO } from '../../schemas/client/client.dto'
import { Client, ClientModel } from '../../schemas/client/client.schema'
import { FilterQuery } from 'mongoose'

export const registerNewClient = async (req: Request<{}, {}, RegisterClientDTO>, res: Response) => {
  try {
    // const { email, rut } = req.body

    // const exists = await ClientModel.findOne({ $or: [{ email }, { rut }] })
    // if (exists) {
    //   res.status(400).json({ success: 'FAILED', message: 'El cliente ya se encuentra registrado' })
    //   return
    // }

    const client = await ClientModel.create(req.body)
    await client.save()

    res.status(201).json({ success: 'OK', message: 'Cliente registrado correctamente' })
    return
  } catch (err) {
    res.status(500).json({ succes: 'FAILED', message: 'Error del servidor' })
    return
  }
}

export const clientsList = async (req: Request<{}, {}, {}, { value?: string }>, res: Response) => {
  try {
    const { value } = req.query

    const filters: FilterQuery<Client>[] = [
      { businessName: { $regex: value ?? '', $options: 'i' } },
      { contact: { $regex: value ?? '', $options: 'i' } },
    ]

    const clients = await ClientModel.aggregate([
      {
        $match: {
          $or: filters,
        },
      },
    ])

    res.status(200).json({
      success: 'OK',
      payload: clients,
      message: 'Clientes obtenidos correctamente',
    })
    return
  } catch (err) {
    res.status(500).json({ succes: 'FAILED', message: 'Error del servidor' })
    return
  }
}

export const updateClient = async (req: Request<{ id: string }, {}, UpdateClientDTO>, res: Response) => {
  try {
    const { id } = req.params

    const client = await ClientModel.findOne({ $and: [{ _id: id }] })

    if (!client) {
      res.status(400).json({ success: 'FAILED', message: 'El cliente no se encuentra registrado' })
      return
    }

    await client.updateOne(req.body)

    res.status(200).json({ success: 'OK', message: 'Cliente actualizado correctamente' })
    return
  } catch (err) {
    res.status(500).json({ succes: 'FAILED', message: 'Error del servidor' })
    return
  }
}

export const singleClient = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params

    const client = await ClientModel.findOne({ _id: id })
    if (!client) {
      res.status(400).json({ success: 'FAILED', message: 'El cliente no se encuentra registrado' })
      return
    }

    res.status(200).json({
      success: 'OK',
      payload: client,
      message: 'Información del cliente obtenida correctamente',
    })
    return
  } catch (err) {
    res.status(500).json({ succes: 'FAILED', message: 'Error del servidor' })
    return
  }
}

export const removeOnlyClient = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params

    const client = await ClientModel.findOne({ _id: id })
    if (!client) {
      res.status(404).json({ success: 'FAILED', message: 'No se encontró la información del cliente' })
      return
    }

    await client.deleteOne()

    res.status(200).json({
      success: 'OK',
      message: 'Cliente eliminado correctamente',
    })
  } catch (err) {
    res.status(500).json({ succes: 'FAILED', message: 'Error del servidor' })
    return
  }
}

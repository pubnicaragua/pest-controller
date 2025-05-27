import { ObjectId } from 'mongodb'
import { ClientModel } from '../../schemas/client/client.schema'
import { ServiceModel, ServiceTypes } from '../../schemas/service/service.schema'
import { ServiceDataUploadModel } from '../../schemas/serviceDataUpload/serviceDataUpload.schema'

export const groupServiceByTypeAggregate = (clientId?: string) => {
  return ServiceModel.aggregate([
    {
      $match: clientId
        ? {
            clientId: new ObjectId(clientId),
          }
        : {},
    },
    {
      $group: {
        _id: {
          serviceType: '$serviceType',
        },
        count: {
          $sum: 1,
        },
      },
    },
  ])
}

export const groupClients = () => {
  return ClientModel.aggregate([
    {
      $sort: {
        totalServices: -1,
      },
    },
    {
      $project: {
        _id: '$_id',
        businessName: '$businessName',
        totalServices: '$totalServices',
      },
    },
  ])
}

export type DatauploadServiceAgreggate = {
  _id: string
  serviceId: string
  serviceType: string
  serviceDate: Date
  clientId: string
  status: string
  sites: string
}

export const getDatauploadGroupServicesByClientAndType = (clientId: string, serviceType: ServiceTypes) => {
  return ServiceDataUploadModel.aggregate([
    {
      $match: {
        $and: [
          {
            clientId: new ObjectId(clientId),
          },
          {
            serviceType: serviceType,
          },
        ],
      },
    },
    {
      $lookup: {
        from: 'services',
        localField: 'serviceId',
        foreignField: '_id',
        as: 'serviceId',
      },
    },
    {
      $addFields: {
        serviceId: {
          $arrayElemAt: ['$serviceId', 0],
        },
      },
    },
    {
      $sort: {
        'serviceId.serviceDate': -1,
      },
    },
    {
      $limit: 10,
    },
    {
      $lookup: {
        from: 'clients',
        localField: 'clientId',
        foreignField: '_id',
        as: 'clientId',
      },
    },
    {
      $addFields: {
        clientId: {
          $arrayElemAt: ['$clientId', 0],
        },
      },
    },
    {
      $project: {
        serviceId: '$serviceId._id',
        serviceType: '$serviceType',
        serviceDate: '$serviceId.serviceDate',
        clientId: '$clientId._id',
        clientName: '$clientId.businessName',
        status: '$serviceId.status',
        sites: '$sites',
      },
    },
    {
      $sort: {
        serviceDate: 1,
      },
    },
  ])
}

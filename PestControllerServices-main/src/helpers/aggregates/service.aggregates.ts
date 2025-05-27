import { ObjectId } from 'mongodb'
import { UserRoles } from '../../schemas/users/users.schema'
import { ServiceModel } from '../../schemas/service/service.schema'

export const getServicesListAggregate = async (
  role: UserRoles,
  technicalId: string,
  value: string = '',
  urgency = '',
  status = ''
) => {
  return await ServiceModel.aggregate([
    {
      $match:
        role === UserRoles.TECHNICAL
          ? {
              $and: [
                {
                  technicalId: new ObjectId(technicalId),
                },
                {
                  $or: [
                    {
                      status: 'PENDING',
                    },
                    {
                      status: 'IN PROGRESS',
                    },
                  ],
                },
              ],
            }
          : {},
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
      $match: {
        $or: [
          {
            serviceType: {
              $regex: value,
              $options: 'i',
            },
          },
          {
            'clientId.businessName': {
              $regex: value,
              $options: 'i',
            },
          },
        ],
      },
    },
    {
      $match: {
        $and: [
          {
            status: {
              $regex: status,
            },
          },
          {
            urgency: {
              $regex: urgency,
            },
          },
        ],
      },
    },
  ])
}

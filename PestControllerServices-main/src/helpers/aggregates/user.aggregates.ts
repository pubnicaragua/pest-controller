import { UserModel, UserRoles } from '../../schemas/users/users.schema'

export const getUsersListAggregate = async (role: UserRoles, value: string = '') => {
  return await UserModel.aggregate([
    {
      $match: {
        $or: role === UserRoles.ADMIN ? [{ role: UserRoles.ADMIN }, { role: UserRoles.TECHNICAL }] : [{}],
      },
    },
    {
      $match: {
        $or: [
          {
            name: {
              $regex: value,
              $options: 'i',
            },
          },
          {
            lastname: {
              $regex: value,
              $options: 'i',
            },
          },
        ],
      },
    },
  ])
}

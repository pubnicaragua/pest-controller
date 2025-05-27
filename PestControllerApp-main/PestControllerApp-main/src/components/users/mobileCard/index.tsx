import { User, UserRoleTranstale } from '@/api/users/type'
import { capitalizeString } from '@/libs/strings'
import { SwitchIcon, SwitchOffIcon, TrashIcon } from '../../../../packages/icons'
import { colors } from '../../../../tailwind.config'

export type UserCardProps = {
  users: User[]
  enabledUser: (id: string) => void
  deleteUser: (id: string) => void
}

const UserCard: React.FC<UserCardProps> = ({ users, enabledUser, deleteUser }) => {
  return (
    <>
      {users?.map(user => (
        <div
          key={user._id}
          className="flex flex-col bg-white p-2 rounded-md border border-primary border-solid mb-2"
        >
          <div className="flex items-center justify-between w-full mb-2">
            <span className="text-lg font-semibold">{`${user.name} ${user.lastname}`}</span>
            <span>{capitalizeString(UserRoleTranstale[user.role])}</span>
          </div>
          <span>Correo: {user.email}</span>
          <span>Teléfono: {user.rut ?? '--'}</span>
          <div className="flex justify-end h-fit">
            <span className="flex-1">{user.address}</span>
            <div className="flex items-end">
              <i className="cursor-pointer" onClick={() => enabledUser(user._id)}>
                {user.enabled ? (
                  <SwitchIcon width="42" height="42" fill="green" />
                ) : (
                  <SwitchOffIcon width="42" height="42" fill="red" />
                )}
              </i>
              <i className="cursor-pointer p-2 md:mr-4" onClick={() => deleteUser(user._id)}>
                <TrashIcon width="28" height="28" fill={colors.error} />
              </i>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

export default UserCard

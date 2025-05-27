'use client'

import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { api } from '@/api'
import { User, UserRole } from '@/api/users/type'
import { getColumns } from '@/screens/users/table/constants'
import { ContainerListUI, LoadingUI, TableUI } from '../../../packages/components'
import { ResponseDataState } from '@/api/types'
import toast from 'react-hot-toast'
import SearchInput from '@/components/searchInput'
import { useDebounce } from '@/libs/useDebounce'
import { useSession } from '@/contexts/session'
import UserCard from '@/components/users/mobileCard'

const UsersPage: NextPage = () => {
  const [users, setUsers] = useState<ResponseDataState<User[]>>({ data: [], isLoading: true })
  const [searchValue, setSearchValue] = useState<string>('')

  const { session } = useSession()
  const router = useRouter()

  const debounceValue = useDebounce(searchValue)

  const toAddNewUser = () => router.push('/users/create')

  const usersList = async (searchValue: string = '') => {
    const response = await api.users.getUsersList<User[]>(searchValue)
    if (response.status === 200) {
      setUsers({ data: response.data, isLoading: false })
    } else {
      setUsers({ data: [], isLoading: false })
      toast.error(response.message)
    }
  }

  const handleOnSearch = (value: string) => {
    setSearchValue(value)
  }

  const enabledUser = async (id: string) => {
    const response = await api.users.enableUser(id)
    if (response.status === 200) {
      toast.success('Usuario actualizado correctamente')
      usersList(debounceValue)
    } else {
      toast.error('No se pudo actualizar el usuario')
    }
  }

  const deleteUser = async (id: string) => {
    const response = await api.users.removeOnlyUser(id)
    if (response.status === 200) {
      toast.success(response.message)
      usersList(debounceValue)
    } else {
      toast.error(response.message)
    }
  }

  useEffect(() => {
    usersList(debounceValue)
  }, [debounceValue])

  if (users.isLoading) return <LoadingUI />

  return (
    <ContainerListUI
      title="Usuarios"
      description="Aquí puede observar todos los usuarios"
      addBtnText={session.role !== UserRole.TECHNICAL ? 'Registrar usuario' : null}
      handleOnClick={() => toAddNewUser()}
      searchInput={<SearchInput value={searchValue} onChange={handleOnSearch} />}
      isMobile={session.isMobile}
    >
      {session.isMobile ? (
        <UserCard users={users.data ?? []} enabledUser={enabledUser} deleteUser={deleteUser} />
      ) : (
        <TableUI columns={getColumns(enabledUser, deleteUser)} data={users.data ?? []} />
      )}
    </ContainerListUI>
  )
}

export default UsersPage

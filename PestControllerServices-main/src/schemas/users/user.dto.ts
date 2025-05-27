import { UserRoles } from './users.schema'

export type RegisterUserDTO = {
  name: string
  lastname: string
  phoneNumber: number
  email: string
  region: string
  commune: string
  address: string
  rut: string
  role: UserRoles
}

export type RecoverPasswordEmailDTO = {
  email: string
}

export type RecoverPasswordTokenDTO = {
  token: number
}

export type RecoverConfirmDTO = {
  email: string
  token: string
}

export type CreatePasswordDTO = {
  email: string
  password: string
  passwordConfirm: string
}

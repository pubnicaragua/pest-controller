import { User } from '../users/type'

// PAYLOADS
export type SignInPayload = {
  email: string
  password: string
}

export type NewPassword = {
  email: string
  password: string
  passwordConfirm: string
}

export type RecoverPayload = {
  email: string
}

export type TokenPayload = {
  email: string
  token: string
}

// RESPONSES
export type SignInResponse = {
  user: User
  token: string
}

export type GetMeResponse = {
  data: User
}

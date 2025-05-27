export type User = {
  _id: string
  name: string
  lastname: string
  phoneNumber: number
  email: string
  region: string
  commune: string
  address: string
  rut: string
  role: UserRole
  enabled: boolean
  createdAt: Date
}

export enum UserRole {
  'SUPERADMIN' = 'SUPERADMIN',
  'ADMIN' = 'ADMIN',
  'TECHNICAL' = 'TECHNICAL',
}

export enum UserRoleTranstale {
  'SUPERADMIN' = 'SUPERUSUARIO',
  'ADMIN' = 'ADMINISTRADOR',
  'TECHNICAL' = 'TÉCNICO',
}

// PAYLOADS
export type RegisterUserPayload = {
  name: string
  lastname: string
  phoneNumber: number
  email: string
  region: string
  commune: string
  address: string
  rut: string
  role?: UserRole
}

export type UpdateUserPayload = {
  name: string
  lastname: string
  phoneNumber: number
  rut: string
  email: string
  region: string
  commune: string
  address: string
  role?: UserRole
}

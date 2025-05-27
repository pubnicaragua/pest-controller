import { UserRole } from '@/api/users/type'

export type Session = {
  _id?: string
  name?: string
  lastname?: string
  phoneNumber?: number
  email?: string
  region?: string
  commune?: string
  address?: string
  rut?: string
  role?: UserRole
  enabled?: boolean
  createdAt?: Date
  isLoading: boolean
  logged: boolean
  isMobile: boolean
}

export type SessionContextType = {
  session: Session
  setSession: (session: Session) => void
  resetSession: () => void
}

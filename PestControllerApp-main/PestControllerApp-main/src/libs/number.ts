import { generateSecureToken } from 'n-digit-token'

export const generateCode = (digits: number = 6) => {
  return generateSecureToken(digits)
}

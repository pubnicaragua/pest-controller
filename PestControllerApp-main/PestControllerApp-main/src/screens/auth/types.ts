export enum AuthScreenEnum {
  SINGIN = 'SignIn',
  RECOVER = 'Recover',
  TOKEN = 'Token',
  CREATE = 'Create',
}

export type AuthScreenProps = {
  handleChangeScreen: React.Dispatch<React.SetStateAction<AuthScreenEnum>>
  email?: string
  handleSetEmail?: React.Dispatch<React.SetStateAction<string>>
  isMobile?: boolean
}

// export type SignInScreenProps = {
//   handleChangeScreen: React.Dispatch<React.SetStateAction<AuthScreenEnum>>
// }

// export type RecoverScreenProps = {
//   handleChangeScreen: React.Dispatch<React.SetStateAction<AuthScreenEnum>>
// }

// export type TokenScreenProps = {
//   handleChangeScreen: React.Dispatch<React.SetStateAction<AuthScreenEnum>>
// }

export type RecoverValues = {
  email: string
}

export type TokenValues = {
  token: number
}

export type CreateValues = {
  password: string
  passwordConfirm: string
}

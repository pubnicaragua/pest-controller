import { FormEventHandler } from 'react'

export type FormUIProps = {
  title: string
  onSubmit: FormEventHandler<HTMLFormElement>
  children: JSX.Element | JSX.Element[]
}

export type Response<T> = {
  status: number
  data?: T
  message: string
}

export type ResponseDataState<T> = {
  data: T
  isLoading: boolean
}

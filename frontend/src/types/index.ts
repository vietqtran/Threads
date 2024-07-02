export interface Response {
  isError: boolean
  message: string
  data?: any
  errors: any[]
  statusCode: number
  status: number
}

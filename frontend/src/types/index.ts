export interface Response<T> {
    isError: boolean
    message: string
    data?: T
    errors: string[]
    statusCode: number
    status: number
}

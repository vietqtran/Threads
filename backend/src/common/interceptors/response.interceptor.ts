import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'

import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

export interface Response<T> {
  status: number
  message: string
  errors: object | null
  data: T | null
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => {
        const statusCode = context.switchToHttp().getResponse().statusCode
        const status = statusCode >= 400 ? 0 : 1
        const isError = statusCode >= 400
        return {
          isError,
          statusCode,
          status,
          data,
          message: data?.message || null,
          errors: data?.errors || null
        }
      })
    )
  }
}

import * as cookieParser from 'cookie-parser'

import { NestFactory, Reflector } from '@nestjs/core'

import { AppModule } from '@/resources/app/app.module'
import JwtAuthGuard from './resources/auth/guards/jwt.guard'
import { TransformInterceptor } from './common/interceptors/response.interceptor'
import { ValidationPipe } from '@nestjs/common'
import { configSwagger } from './configs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.setGlobalPrefix('api/v1/')

  app.useGlobalInterceptors(new TransformInterceptor())

  app.useGlobalPipes(new ValidationPipe())

  app.useGlobalGuards(new JwtAuthGuard(app.get(Reflector)))

  app.use(cookieParser())

  configSwagger(app)

  app.enableCors({
    origin: '*',
    methods: 'GET,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: 'Content-Type, Authorization, Refresh'
  })

  const port = process.env.PORT || 4000
  await app.listen(port)
}
bootstrap()

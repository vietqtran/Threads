import * as cookieParser from 'cookie-parser'

import { NestFactory, Reflector } from '@nestjs/core'

import { AppModule } from '@/modules/app/app.module'
import { ValidationPipe } from '@nestjs/common'
import { TransformInterceptor } from './common/interceptors/response.interceptor'
import { configSwagger } from './configs/swagger'
import JwtAuthGuard from './modules/auth/guards/jwt.guard'

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

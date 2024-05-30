import * as cookieParser from 'cookie-parser'

import { Logger, ValidationPipe } from '@nestjs/common'
import { NestFactory, Reflector } from '@nestjs/core'

import { AppModule } from '@/resources/app/app.module'
import { ConfigService } from '@nestjs/config'
import JwtAuthGuard from './resources/auth/guards/jwt-auth.guard'
import { TransformInterceptor } from './common/interceptors/response.interceptor'
import { configSwagger } from './configs/swagger'

async function bootstrap() {
  const logger = new Logger(bootstrap.name)
  const app = await NestFactory.create(AppModule)
  const configService = app.get(ConfigService)

  app.setGlobalPrefix('api/v1/')

  app.useGlobalInterceptors(new TransformInterceptor())

  app.useGlobalPipes(new ValidationPipe())

  app.useGlobalGuards(new JwtAuthGuard(app.get(Reflector)))

  app.use(cookieParser())

  configSwagger(app)

  app.enableCors({
    origin: '*',
    methods: 'GET,PUT,PATCH,POST,DELETE',
    credentials: true
  })

  const port = process.env.PORT || 4000
  await app.listen(port)

  // Logging
  logger.debug(`Application is running on: ${await app.getUrl()}`)
  logger.debug(`Swagger is running on: ${await app.getUrl()}/api`)
  logger.debug(`DATABASE_URL: ${configService.get('database.url')}`)
  logger.debug(`ACCESS_TOKEN_SECRET: ${configService.get('jwt.accessSecret')}`)
  logger.debug(
    `ACCESS_TOKEN_SECRET: ${configService.get('jwt.accessExpiresIn')}`
  )
  logger.debug(`ACCESS_TOKEN_SECRET: ${configService.get('jwt.refreshSecret')}`)
  logger.debug(
    `ACCESS_TOKEN_SECRET: ${configService.get('jwt.refreshExpiresIn')}`
  )
}
bootstrap()

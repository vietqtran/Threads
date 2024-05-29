import { NestFactory } from '@nestjs/core'
import { AppModule } from '@/resources/app/app.module'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { configSwagger } from './configs/swagger'

async function bootstrap() {
  const logger = new Logger(bootstrap.name)
  const app = await NestFactory.create(AppModule)
  const configService = app.get(ConfigService)

  app.setGlobalPrefix('api/v1/');

  configSwagger(app)

  app.enableCors({
    origin: '*',
    methods: 'GET,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  
  const port = process.env.PORT || 4000
  await app.listen(port)
  
  // Logging
  logger.debug(`Application is running on: ${await app.getUrl()}`)
  logger.debug(`Swagger is running on: ${await app.getUrl()}/api`)
  logger.debug(`DATABASE_URL: ${configService.get('database.url')}`)
}
bootstrap()

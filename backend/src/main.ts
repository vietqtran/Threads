import { NestFactory } from '@nestjs/core'
import { AppModule } from '@/resources/app/app.module'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

async function bootstrap() {
  const logger = new Logger(bootstrap.name)
  const app = await NestFactory.create(AppModule)
  const configService = app.get(ConfigService)

  app.setGlobalPrefix('api/v1/');

  const config = new DocumentBuilder()
    .setTitle('EcomMERN API')
    .setDescription('EcomMERN API description')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
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

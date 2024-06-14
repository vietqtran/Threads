import { INestApplication } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

export function configSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Threads API')
    .setDescription('Threads API description')
    .setVersion('1.0.0')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)
}

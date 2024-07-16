import * as cookieParser from 'cookie-parser'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { NestFactory, Reflector } from '@nestjs/core'
import { AppModule } from '@/modules/app/app.module'
import JwtAuthGuard from './modules/auth/guards/jwt.guard'
import { TransformInterceptor } from './common/interceptors/response.interceptor'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.setGlobalPrefix('api/v1/')

  app.useGlobalInterceptors(new TransformInterceptor())

  app.useGlobalPipes(new ValidationPipe())

  app.useGlobalGuards(new JwtAuthGuard(app.get(Reflector)))

  app.use(cookieParser())

  const config = new DocumentBuilder()
    .setTitle('Threads API')
    .setDescription('Threads API description')
    .setVersion('1.0.0')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  app.enableCors({
    origin: process.env.CLIENT_URL,
    credentials: true
  })

  const port = process.env.PORT || 4000
  await app.listen(port)
}
bootstrap()
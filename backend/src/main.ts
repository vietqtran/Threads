import { NestFactory } from '@nestjs/core'
import { AppModule } from './common/_app/app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  await app.listen(3000)
}
bootstrap()

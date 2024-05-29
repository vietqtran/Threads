import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { Module } from '@nestjs/common'
import { PasswordModule } from '@/services/password/password.module'

@Module({
  imports: [PasswordModule],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}

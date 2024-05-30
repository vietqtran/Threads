import { ConfigModule, ConfigService } from '@nestjs/config'

import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtModule } from '@nestjs/jwt'
import { JwtStrategy } from './strategies/jwt.strategy'
import { LocalStrategy } from './strategies/local.strategy'
import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { PasswordModule } from '@/resources/password/password.module'
import { UsersModule } from '../users/users.module'

@Module({
  imports: [
    PasswordModule,
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('jwt.accessSecret'),
        signOptions: {
          expiresIn: `${configService.get<string>('jwt.accessExpiresIn')}s`
        }
      })
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy]
})
export class AuthModule {}

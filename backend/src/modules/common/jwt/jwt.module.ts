import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtService, JwtModule as NestJwtModule } from '@nestjs/jwt'

@Module({
  imports: [
    NestJwtModule.registerAsync({
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
  providers: [JwtService],
  exports: [JwtService]
})
export class JwtModule {}

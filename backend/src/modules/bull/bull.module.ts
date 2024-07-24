import { ConfigService } from '@nestjs/config'
import { Module } from '@nestjs/common'
import { BullModule as NestBullModule } from '@nestjs/bullmq'

@Module({
    imports: [
        NestBullModule.forRootAsync({
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                connection: {
                    host: configService.get('redis.host'),
                    port: configService.get('redis.port')
                },
                defaultJobOptions: {
                    removeOnComplete: 1000,
                    removeOnFail: 5000,
                    attempts: 0
                }
            })
        })
    ]
})
export class BullModule {}

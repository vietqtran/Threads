import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule as NestMongooseModule } from '@nestjs/mongoose'

@Module({
    imports: [
        NestMongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                uri: configService.get<string>('database.url'),
                dbName: configService.get<string>('database.dbName')
            }),
            inject: [ConfigService]
        })
    ]
})
export class MongooseModule {}

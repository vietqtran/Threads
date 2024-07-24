import { Body, Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common'
import { AppService } from './app.service'
import { Public } from '@/common/decorators/public.decorator'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiBody, ApiConsumes, ApiProperty } from '@nestjs/swagger'
import { UploadService } from '../upload/upload.service'

class UploadFileDto {
    @ApiProperty({ type: 'file' })
    file: Express.Multer.File
}

@Controller()
export class AppController {
    constructor(
        private readonly appService: AppService,
        private readonly uploadService: UploadService
    ) {}

    @Get()
    @Public()
    async getHello() {
        return await this.appService.getHello()
    }

    @Post('upload')
    @Public()
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file: Express.Multer.File, @Body() fileInfo: UploadFileDto) {
        console.log(fileInfo)
        return await this.uploadService.uploadFile(file)
    }

    @Post('remove-image')
    @Public()
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                key: {
                    type: 'string'
                }
            }
        }
    })
    async removeFile(@Body() fileInfo: { key: string }) {
        return await this.uploadService.deleteFile(fileInfo.key)
    }
}

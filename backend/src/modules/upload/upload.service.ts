import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as AWS from 'aws-sdk'

@Injectable()
export class UploadService {
    private readonly s3: AWS.S3

    constructor(private readonly configService: ConfigService) {
        this.s3 = new AWS.S3({
            accessKeyId: this.configService.get<string>('s3.accessKeyId'),
            secretAccessKey: this.configService.get<string>('s3.secretAccessKey'),
            region: this.configService.get<string>('s3.region')
        })
    }

    async uploadFile(file: Express.Multer.File): Promise<AWS.S3.ManagedUpload.SendData> {
        const { originalname, buffer, mimetype } = file
        const bucket = this.configService.get<string>('s3.publicBucket')

        return this.s3Upload(buffer, bucket, originalname, mimetype)
    }

    private async s3Upload(
        file: Buffer,
        bucket: string,
        name: string,
        mimetype: string
    ): Promise<AWS.S3.ManagedUpload.SendData> {
        const params: AWS.S3.PutObjectRequest = {
            Bucket: bucket,
            Key: name,
            Body: file,
            ACL: 'public-read',
            ContentType: mimetype,
            ContentDisposition: 'inline'
        }

        try {
            return await this.s3.upload(params).promise()
        } catch (error) {
            console.error('S3 upload error:', error)
            throw error
        }
    }

    async deleteFile(key: string): Promise<AWS.S3.DeleteObjectOutput> {
        const params: AWS.S3.DeleteObjectRequest = {
            Bucket: this.configService.get<string>('s3.publicBucket'),
            Key: key
        }

        try {
            return await this.s3.deleteObject(params).promise()
        } catch (error) {
            console.error('S3 delete error:', error)
            throw error
        }
    }
}

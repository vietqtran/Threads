import * as AWS from 'aws-sdk'

import { ConfigService } from '@nestjs/config'
import { Injectable } from '@nestjs/common'

@Injectable()
export class UploadService {
  constructor(private readonly configService: ConfigService) {}

  s3 = new AWS.S3({
    accessKeyId: this.configService.get<string>('s3.accessKeyId'),
    secretAccessKey: this.configService.get<string>('s3.secretAccessKey')
  })

  async uploadFile(file) {
    console.log(file)
    const { originalname } = file

    return await this.s3_upload(
      file.buffer,
      this.configService.get<string>('s3.publicBucket'),
      originalname,
      file.mimetype
    )
  }

  async s3_upload(file, bucket, name, mimetype) {
    const params = {
      Bucket: bucket,
      Key: String(name),
      Body: file,
      ACL: 'public-read',
      ContentType: mimetype,
      ContentDisposition: 'inline',
      CreateBucketConfiguration: {
        LocationConstraint: this.configService.get<string>('s3.region')
      }
    }
    try {
      const s3Response = await this.s3.upload(params).promise()
      console.log('response: ', s3Response)
      return s3Response
    } catch (e) {
      console.log(e)
    }
  }

  async deleteFile(key: string) {
    const params = {
      Bucket: this.configService.get<string>('s3.publicBucket'),
      Key: key
    }
    const data = await this.s3.deleteObject(params).promise()
    return data
  }
}

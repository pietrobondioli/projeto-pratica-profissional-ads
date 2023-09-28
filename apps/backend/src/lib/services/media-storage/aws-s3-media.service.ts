import { AwsConfig } from '#/be/config/env/env.types';
import { S3, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import {
  Media,
  MediaFile,
  MediaStorageService,
} from './interfaces/media-storage.interface';

@Injectable()
export class AwsS3MediaService implements MediaStorageService {
  private s3: S3;
  private s3Client: S3Client;

  constructor(private readonly awsConfig: AwsConfig) {
    const config = {
      region: awsConfig.s3.region,
      credentials: {
        accessKeyId: awsConfig.s3.accessKeyId,
        secretAccessKey: awsConfig.s3.secretAccessKey,
      },
    };

    this.s3 = new S3(config);

    this.s3Client = new S3Client(config);
  }

  async uploadFile(file: MediaFile, isPublic: boolean = false): Promise<Media> {
    const key = `${Date.now()}-${file.originalname}`;

    const uploadResult = await this.s3.putObject({
      Bucket: this.awsConfig.s3.bucket,
      Body: file.buffer,
      Key: key,
      ACL: isPublic ? 'public-read' : 'private',
    });

    return {
      key: key,
      bucket: this.awsConfig.s3.bucket,
      eTag: uploadResult.ETag,
      versionId: uploadResult.VersionId,
      mimeType: file.mimetype,
      size: file.size,
    };
  }

  async deleteFile(key: string, bucket: string): Promise<void> {
    await this.s3.deleteObject({
      Bucket: bucket,
      Key: key,
    });
  }
}

import { Module } from '@nestjs/common';
import { AwsS3MediaService } from './aws-s3-media.service';

@Module({
  providers: [AwsS3MediaService],
  exports: [AwsS3MediaService],
})
export class MediaStorageModule {}

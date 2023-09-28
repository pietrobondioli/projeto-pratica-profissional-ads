import { Module } from '@nestjs/common';
import { AwsSESMailService } from './aws-ses-mail.service';

@Module({
  providers: [AwsSESMailService],
  exports: [AwsSESMailService],
})
export class MailModule {}

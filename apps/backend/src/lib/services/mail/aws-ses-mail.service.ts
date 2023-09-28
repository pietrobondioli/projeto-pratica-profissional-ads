import { AwsConfig } from '#/be/config/env/env.types';
import * as aws from '@aws-sdk/client-ses';
import { defaultProvider } from '@aws-sdk/credential-provider-node';
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import SESTransport from 'nodemailer/lib/ses-transport';
import { MailService } from './interface/mail-service.types';

@Injectable()
export class AwsSESMailService implements MailService {
  private transporter: nodemailer.Transporter<SESTransport.SentMessageInfo>;

  constructor(private readonly awsConfig: AwsConfig) {
    const config = {
      region: awsConfig.ses.region,
      credentials: {
        accessKeyId: awsConfig.ses.accessKeyId,
        secretAccessKey: awsConfig.ses.secretAccessKey,
      },
    };

    const ses = new aws.SES(config);

    this.transporter = nodemailer.createTransport({
      SES: { ses, aws, defaultProvider },
    });
  }

  async sendMail(props: {
    to: string;
    subject: string;
    message: string;
  }): Promise<void> {
    const { to, subject, message } = props;

    const mailOptions = {
      from: this.awsConfig.ses.mailFrom,
      to,
      subject: subject,
      html: message,
    };
    console.log('Sending:', mailOptions);

    await this.transporter.sendMail(mailOptions);
  }
}

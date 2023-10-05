import { AwsSESMailService } from '#/be/lib/services/mail/aws-ses-mail.service';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { UserChangedEmailEvent } from '../domain/events/user-changed-email.event';

@Injectable()
export class OnEmailChangeSendEmailEventHandler {
  constructor(private readonly emailService: AwsSESMailService) {}

  @OnEvent(UserChangedEmailEvent.name, { async: true, promisify: true })
  async handle(event: UserChangedEmailEvent): Promise<any> {
    try {
      this.emailService.sendMail({
        to: event.payload.token.oldEmail,
        subject: 'Email changed',
        html: `
          <p>Your email has been changed to ${event.payload.token.newEmail}.</p>
          <p>If you did not do this, please contact us immediately.</p>
        `,
      });
    } catch {}
  }
}

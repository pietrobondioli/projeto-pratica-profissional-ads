import { AwsSESMailService } from '#/be/lib/services/mail/aws-ses-mail.service';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { UserRequestedEmailChangeEvent } from '../../domain/events/user-requested-email-change.event';

@Injectable()
export class OnUserReqEmailChangeSendEmailEventHandler {
  constructor(private readonly mailService: AwsSESMailService) {}

  @OnEvent(UserRequestedEmailChangeEvent.name, { async: true, promisify: true })
  async handle(event: UserRequestedEmailChangeEvent): Promise<any> {
    this.mailService.sendMail({
      to: event.payload.token.oldEmail,
      subject: 'You have requested to change your email',
      html: `
        <p>
          You have requested to change your email to ${event.payload.token.newEmail}. Please confirm this change by clicking the link below.
        </p>
        <p>
          <a href="/confirm-email-change?token=${event.payload.token}">Confirm email change</a>
        </p>
        <p>If you did not do this, please contact us immediately.</p>
      `,
    });
  }
}

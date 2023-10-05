import { AwsSESMailService } from '#/be/lib/services/mail/aws-ses-mail.service';
import { Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { UserRepo } from '../db/user.model';
import { UserRequestedEmailConfirmationTokenEvent } from '../domain/events/user-requested-email-confirmation-token.event';
import { USER_REPO } from '../user.di-tokens';

@Injectable()
export class OnUserReqNewVerificationTokenSendEmailEventHandler {
  constructor(
    @Inject(USER_REPO)
    private readonly userRepo: UserRepo,
    private readonly mailService: AwsSESMailService,
  ) {}

  @OnEvent(UserRequestedEmailConfirmationTokenEvent.name, {
    async: true,
    promisify: true,
  })
  async handle(event: UserRequestedEmailConfirmationTokenEvent): Promise<any> {
    try {
      const user = await this.userRepo.findOneBy({
        id: event.payload.userId,
      });

      if (!user) {
        return;
      }

      this.mailService.sendMail({
        to: user?.email,
        subject: 'Confirm your email',
        html: `
        <p>
          Please confirm your email by clicking on the link below.
        </p>
        <p>
          <a href="/confirm-email?token=${event.payload.token.token}">Confirm email</a>
        </p>
      `,
      });
    } catch {}
  }
}

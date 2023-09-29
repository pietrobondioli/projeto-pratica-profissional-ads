import { AwsSESMailService } from '#/be/lib/services/mail/aws-ses-mail.service';
import { Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { UserRepo } from '../../db/user.model';
import { UserRequestedPasswordChangeEvent } from '../../domain/events/user-requested-password-change.event';
import { USER_REPO } from '../../user.di-tokens';

@Injectable()
export class OnUserReqPasswordChangeSendEmailEventHandler {
  constructor(
    @Inject(USER_REPO)
    private readonly userRepo: UserRepo,
    private readonly mailService: AwsSESMailService,
  ) {}

  @OnEvent(UserRequestedPasswordChangeEvent.name, {
    async: true,
    promisify: true,
  })
  async handle(event: UserRequestedPasswordChangeEvent): Promise<any> {
    try {
      const user = await this.userRepo.findOneBy({
        id: event.payload.userId,
      });

      if (!user) {
        return;
      }

      this.mailService.sendMail({
        to: user?.email,
        subject: 'Change your password',
        html: `
        <p>
          Please change your password by clicking on the link below.
        </p>
        <p>
          <a href="/change-password?token=${event.payload.token.token}">Change password</a>
        </p>
        <p>If you did not do this, please contact us immediately.</p>
      `,
      });
    } catch {}
  }
}

import { AwsSESMailService } from '#/be/lib/services/mail/aws-ses-mail.service';
import { Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { UserRepo } from '../db/user.model';
import { UserChangedPasswordEvent } from '../domain/events/user-changed-password.event';
import { USER_REPO } from '../user.di-tokens';

@Injectable()
export class OnPasswordChangeSendEmailEventHandler {
  constructor(
    @Inject(USER_REPO)
    private readonly userRepo: UserRepo,
    private readonly mailService: AwsSESMailService,
  ) {}

  @OnEvent(UserChangedPasswordEvent.name, { async: true, promisify: true })
  async handle(event: UserChangedPasswordEvent): Promise<any> {
    try {
      const user = await this.userRepo.findOneBy({
        id: event.payload.userId,
      });

      if (!user) {
        return;
      }

      this.mailService.sendMail({
        to: user?.email,
        subject: 'Your password has been changed',
        html: `
        <p>
          Your password has been changed.
        </p>
        <p>
          This is a confirmation that the password for your account ${user.email} has just been changed.
        </p>
        <p>If you did not do this, please contact us immediately.</p>
      `,
      });
    } catch {}
  }
}

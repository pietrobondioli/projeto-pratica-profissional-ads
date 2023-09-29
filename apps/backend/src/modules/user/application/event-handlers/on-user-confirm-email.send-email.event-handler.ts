import { AwsSESMailService } from '#/be/lib/services/mail/aws-ses-mail.service';
import { Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { UserConfirmedEmailEvent } from '../../domain/events/user-confirmed-email.event';
import { USER_REPO } from '../../user.di-tokens';
import { UserRepo } from './../../db/user.model';

@Injectable()
export class OnUserConfirmEmailSendEmailEventHandler {
  constructor(
    @Inject(USER_REPO)
    private readonly userRepo: UserRepo,
    private readonly mailService: AwsSESMailService,
  ) {}

  @OnEvent(UserConfirmedEmailEvent.name, { async: true, promisify: true })
  async handle(event: UserConfirmedEmailEvent): Promise<any> {
    const user = await this.userRepo.findOneBy({
      id: event.payload.userId,
    });

    if (!user) {
      return;
    }

    this.mailService.sendMail({
      to: user?.email,
      subject: 'You have confirmed your email',
      html: `
        <p>
          Congratulations! Your email has been confirmed. Welcome to the community!
        </p>
        <p>
          This is a confirmation that the email for your account ${user.email} has just been confirmed.
        </p>
      `,
    });
  }
}

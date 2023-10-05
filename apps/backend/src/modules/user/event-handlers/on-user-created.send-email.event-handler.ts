import { AwsSESMailService } from '#/be/lib/services/mail/aws-ses-mail.service';
import { Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { UserRepo } from '../db/user.model';
import { UserCreatedEvent } from '../domain/events/user-created.event';
import { USER_REPO } from '../user.di-tokens';

@Injectable()
export class OnUserCreatedSendEmailEventHandler {
  constructor(
    @Inject(USER_REPO)
    private readonly userRepo: UserRepo,
    private readonly mailService: AwsSESMailService,
  ) {}

  @OnEvent(UserCreatedEvent.name, { async: true, promisify: true })
  async handle(event: UserCreatedEvent): Promise<any> {
    try {
      const user = await this.userRepo.findOneBy({
        id: event.payload.userId,
      });

      if (!user) {
        return;
      }

      await this.mailService.sendMail({
        to: user?.email,
        subject: 'Welcome to the community!',
        html: `
        <p>
          Welcome to the community!
        </p>
        <p>
          This is a confirmation that the account ${user.email} has just been created.
        </p>
      `,
      });
    } catch {}
  }
}

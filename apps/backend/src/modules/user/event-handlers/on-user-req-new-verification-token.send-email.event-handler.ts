import { AppConfig } from '#/be/config/env/env.types';
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
    private readonly appConfig: AppConfig,
  ) {}

  @OnEvent(UserRequestedEmailConfirmationTokenEvent.name, {
    async: true,
    promisify: true,
  })
  async handle(event: UserRequestedEmailConfirmationTokenEvent): Promise<any> {
    try {
      const user = await this.userRepo.findOne({
        where: {
          id: event.payload.userId,
        },
        relations: ['userProfile'],
      });

      if (!user) {
        return;
      }

      this.mailService.sendMail({
        to: user?.email,
        subject: 'Confirm your email',
        html: `
        <p>
          Olá, ${user?.userProfile.firstName}! Por favor, confirme seu email clicando no link abaixo.
        </p>
        <p>
          <a href="${this.appConfig.appUrl}/confirm-email/${event.payload.token.token}">Confirmar email</a>
        </p>
      `,
      });
    } catch {}
  }
}

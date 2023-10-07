import { AppConfig } from '#/be/config/env/env.types';
import { AwsSESMailService } from '#/be/lib/services/mail/aws-ses-mail.service';
import { Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { v4 } from 'uuid';
import { EmailVerificationTokenRepo } from '../db/email-verification-token.model';
import { UserRepo } from '../db/user.model';
import { EmailVerificationToken } from '../domain/email-verification-token.entity';
import { UserCreatedEvent } from '../domain/events/user-created.event';
import { EMAIL_VERIFICATION_TOKEN_REPO, USER_REPO } from '../user.di-tokens';

@Injectable()
export class OnUserCreatedSendVerificationTokenEmailEventHandler {
  constructor(
    @Inject(USER_REPO)
    private readonly userRepo: UserRepo,
    @Inject(EMAIL_VERIFICATION_TOKEN_REPO)
    private readonly emailVerificationTokenRepo: EmailVerificationTokenRepo,
    private readonly mailService: AwsSESMailService,
    private readonly appConfig: AppConfig,
  ) {}

  @OnEvent(UserCreatedEvent.name, {
    async: true,
    promisify: true,
  })
  async handle(event: UserCreatedEvent): Promise<any> {
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

      const token = new EmailVerificationToken(user.id);
      token.user = user;
      token.token = v4();
      token.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30); // 30 days

      await this.emailVerificationTokenRepo.save(token);

      this.mailService.sendMail({
        to: user?.email,
        subject: 'Sua conta foi criada com sucesso! Confirme seu email',
        html: `
        <p>
          Olá, ${user?.userProfile.firstName}! Sua conta foi criada com sucesso. Para confirmar seu email, clique no link abaixo.
        </p>
        <p>
          <a href="${this.appConfig.appUrl}/confirm-email?token=${token.token}">Confirmar email</a>
        </p>
      `,
      });
    } catch {}
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ReservationRepo } from '../../reservation/db/reservation.model';
import { ReservationCanceledEvent } from '../../reservation/domain/events/reservation-canceled.event';
import { RESERVATION_REPO } from '../../reservation/reservation.di-tokens';
import { UserRepo } from '../../user/db/user.model';
import { USER_REPO } from '../../user/user.di-tokens';
import { NotificationRepo } from '../db/notification.model';
import { Notification } from '../domain/notification.entity';
import { NOTIFICATION_REPO } from '../notification.di-tokens';

@Injectable()
export class OnReservationCanceledNotifyUsersEventHandler {
  constructor(
    @Inject(USER_REPO)
    private readonly userRepo: UserRepo,
    @Inject(NOTIFICATION_REPO)
    private readonly notificationRepo: NotificationRepo,
    @Inject(RESERVATION_REPO)
    private readonly reservationRepo: ReservationRepo,
  ) {}

  @OnEvent(ReservationCanceledEvent.name, { async: true, promisify: true })
  async handle(event: ReservationCanceledEvent): Promise<any> {
    try {
      const { reservationId, byUserId } = event.payload;

      const user = await this.userRepo.findOne({
        where: { id: byUserId },
        relations: ['userProfile'],
      });

      if (!user) {
        return;
      }

      const reservation = await this.reservationRepo.findOne({
        where: { id: reservationId },
        relations: ['equipment', 'equipment.owner', 'renter'],
      });

      if (!reservation) {
        return;
      }

      const whoCanceled =
        reservation.renter.id === byUserId ? 'renter' : 'rentee';

      if (whoCanceled === 'renter') {
        const renterNotification = new Notification();
        renterNotification.message = `Sua reserva o equipamento ${reservation.equipment.title} foi cancelada por ${user.userProfile.firstName} ${user.userProfile.lastName} (locador)`;
        renterNotification.user = user;

        await this.notificationRepo.save(renterNotification);

        const renteeNotification = new Notification();
        renteeNotification.message = `A reserva para o equipamento ${reservation.equipment.title} foi cancelada por ${user.userProfile.firstName} ${user.userProfile.lastName} (locador)`;
        renteeNotification.user = reservation.equipment.owner;

        await this.notificationRepo.save(renteeNotification);
      } else {
        const renterNotification = new Notification();
        renterNotification.message = `A reserva para o equipamento ${reservation.equipment.title} foi cancelada por ${user.userProfile.firstName} ${user.userProfile.lastName} (locatário)`;

        await this.notificationRepo.save(renterNotification);

        const renteeNotification = new Notification();
        renteeNotification.message = `A reserva para o equipamento ${reservation.equipment.title} foi cancelada por ${user.userProfile.firstName} ${user.userProfile.lastName} (locatário)`;
        renteeNotification.user = user;

        await this.notificationRepo.save(renteeNotification);
      }
    } catch {}
  }
}

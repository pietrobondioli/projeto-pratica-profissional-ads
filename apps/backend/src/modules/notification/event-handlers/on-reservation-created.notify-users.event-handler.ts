import { Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ReservationRepo } from '../../reservation/db/reservation.model';
import { ReservationCreatedEvent } from '../../reservation/domain/events/reservation-created.event';
import { RESERVATION_REPO } from '../../reservation/reservation.di-tokens';
import { UserRepo } from '../../user/db/user.model';
import { USER_REPO } from '../../user/user.di-tokens';
import { NotificationRepo } from '../db/notification.model';
import { Notification } from '../domain/notification.entity';
import { NOTIFICATION_REPO } from '../notification.di-tokens';

@Injectable()
export class OnReservationCreatedNotifyUsersEventHandler {
  constructor(
    @Inject(USER_REPO)
    private readonly userRepo: UserRepo,
    @Inject(NOTIFICATION_REPO)
    private readonly notificationRepo: NotificationRepo,
    @Inject(RESERVATION_REPO)
    private readonly reservationRepo: ReservationRepo,
  ) {}

  @OnEvent(ReservationCreatedEvent.name, { async: true, promisify: true })
  async handle(event: ReservationCreatedEvent): Promise<any> {
    try {
      const { reservationId } = event.payload;

      const reservation = await this.reservationRepo.findOne({
        where: { id: reservationId },
        relations: ['equipment', 'equipment.owner', 'renter'],
      });

      if (!reservation) {
        return;
      }

      const renterNotification = new Notification();
      renterNotification.message = `Você reservou o equipamento ${reservation.equipment.title}`;
      renterNotification.user = reservation.renter;

      await this.notificationRepo.save(renterNotification);

      const renteeNotification = new Notification();
      renteeNotification.message = `O equipamento ${reservation.equipment.title} foi reservado por ${reservation.renter.userProfile.firstName} ${reservation.renter.userProfile.lastName}`;
      renteeNotification.user = reservation.equipment.owner;

      await this.notificationRepo.save(renteeNotification);
    } catch {}
  }
}

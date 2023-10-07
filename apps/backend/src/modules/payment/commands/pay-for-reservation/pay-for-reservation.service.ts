import { ReservationRepo } from '#/be/modules/reservation/db/reservation.model';
import { ReservationNotFoundError } from '#/be/modules/reservation/domain/errors/reservation-not-found.error';
import { PaymentStatus } from '#/be/modules/reservation/domain/reservation.entity';
import { RESERVATION_REPO } from '#/be/modules/reservation/reservation.di-tokens';
import { CommandResult } from '@nestjs-architects/typed-cqrs';
import { Inject } from '@nestjs/common';
import { CommandHandler, IInferredCommandHandler } from '@nestjs/cqrs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Err, Ok } from 'neverthrow';
import { PaymentRepo } from '../../db/payment.model';
import { PaymentAggregate } from '../../domain/payment.aggregate';
import { Payment } from '../../domain/payment.entity';
import { PAYMENT_REPO } from '../../payment.di-tokens';
import { PayForReservationCommand } from './pay-for-reservation.command';

// TODO: Since this is just a project for college, I will not implement the payment logic. So this service will just create a payment and set the reservation as paid without any additional logic/verification.
@CommandHandler(PayForReservationCommand)
export class PayForReservationCommandHandler
  implements IInferredCommandHandler<PayForReservationCommand>
{
  constructor(
    @Inject(PAYMENT_REPO)
    private readonly paymentRepo: PaymentRepo,
    @Inject(RESERVATION_REPO)
    private readonly reservationRepo: ReservationRepo,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async execute(
    command: PayForReservationCommand,
  ): Promise<CommandResult<PayForReservationCommand>> {
    try {
      const { loggedUser, reservationId, paymentMethod } = command.payload;

      const reservation = await this.reservationRepo.findOne({
        where: { id: reservationId, renter: { id: loggedUser.id } },
      });

      if (!reservation) {
        return new Err(new ReservationNotFoundError());
      }

      const payment = new Payment(loggedUser.id);
      payment.amount = reservation.totalPrice;
      payment.paymentMethod = paymentMethod;
      payment.reservation = reservation;
      payment.paymentDate = new Date();

      const createdPayment = await this.paymentRepo.save(payment);

      reservation.payment = createdPayment;
      reservation.paymentStatus = PaymentStatus.PAID;

      await this.reservationRepo.save(reservation);

      PaymentAggregate.publishEvents(this.eventEmitter);

      return new Ok(createdPayment.id);
    } finally {
      PaymentAggregate.clearEvents();
    }
  }
}

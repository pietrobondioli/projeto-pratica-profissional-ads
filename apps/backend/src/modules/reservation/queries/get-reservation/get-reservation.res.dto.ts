import { ApiProperty } from '@nestjs/swagger';

import { Expose } from 'class-transformer';
import { PaymentStatus } from '../../domain/reservation.entity';

// TODO: Add more properties
export class GetReservationResDto {
  @Expose()
  @ApiProperty({
    example: '2021-01-01T00:00:00.000Z',
    description: 'Start date',
  })
  readonly startDate: Date;

  @Expose()
  @ApiProperty({
    example: '2021-01-02T00:00:00.000Z',
    description: 'End date',
  })
  readonly endDate: Date;

  @Expose()
  @ApiProperty({
    example: '100',
    description: 'Total price',
  })
  readonly totalPrice: number;

  @Expose()
  @ApiProperty({
    example: 'Pending',
    description: 'Payment status',
    enum: PaymentStatus,
    enumName: 'PaymentStatus',
  })
  readonly paymentStatus: PaymentStatus;
}

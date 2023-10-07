import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

import { ResponseBase } from '#/be/lib/api/response.dto.base';
import { PaymentStatus } from '../../domain/reservation.entity';

class EquipmentDto extends ResponseBase {}

class UserDto extends ResponseBase {}

class PaymentDto extends ResponseBase {}

class FeedbackDto extends ResponseBase {}

export class GetReservationResDto extends ResponseBase {
  @Expose()
  @Type(() => EquipmentDto)
  @ApiProperty({
    type: EquipmentDto,
    description: 'Equipment id object',
  })
  equipment: EquipmentDto;

  @Expose()
  @Type(() => UserDto)
  @ApiProperty({
    type: UserDto,
    description: 'Renter id object',
  })
  renter: UserDto;

  @Expose()
  @Type(() => UserDto)
  @ApiProperty({
    type: UserDto,
    description: 'Rentee id object',
  })
  rentee: UserDto;

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

  @Expose()
  @Type(() => PaymentDto)
  @ApiProperty({
    type: PaymentDto,
    description: 'Payment id object',
  })
  payment: PaymentDto;

  @Expose()
  @Type(() => FeedbackDto)
  @ApiProperty({
    type: () => [FeedbackDto],
    description: 'Array of feedbacks',
  })
  feedbacks: FeedbackDto[];
}

import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

import { PaginatedResponseDto } from '#/be/lib/api/paginated.response.base';
import { ResponseBase } from '#/be/lib/api/response.dto.base';

import { PaymentStatus } from '../../domain/reservation.entity';

// TODO: Add more properties
class ReservationDto extends ResponseBase {
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

export class ListUserReservationsResDto extends PaginatedResponseDto<ReservationDto> {
  @Expose()
  @Type(() => ReservationDto)
  @ApiProperty({
    description: 'Array of notifications',
    type: () => [ReservationDto],
    isArray: true,
  })
  readonly items: ReservationDto[];
}

import { PaginatedResponseDto } from '#/be/lib/api/paginated.response.base';
import { ResponseBase } from '#/be/lib/api/response.dto.base';
import { ApiProperty } from '@nestjs/swagger';
import { PaymentStatus } from '../../domain/reservation.entity';

// TODO: Add more properties
class ReservationDto extends ResponseBase {
  @ApiProperty({
    example: '2021-01-01T00:00:00.000Z',
    description: 'Start date',
  })
  readonly startDate: Date;

  @ApiProperty({
    example: '2021-01-02T00:00:00.000Z',
    description: 'End date',
  })
  readonly endDate: Date;

  @ApiProperty({
    example: '100',
    description: 'Total price',
  })
  readonly totalPrice: number;

  @ApiProperty({
    example: 'Pending',
    description: 'Payment status',
    enum: PaymentStatus,
  })
  readonly paymentStatus: PaymentStatus;
}

export class ListUserReservationsResDto extends PaginatedResponseDto<ReservationDto> {}

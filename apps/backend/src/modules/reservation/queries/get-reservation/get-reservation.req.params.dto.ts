import { ApiProperty } from '@nestjs/swagger';

export class GetReservationReqParamsDto {
  @ApiProperty({
    example: 'reservation-id-1',
    description: 'Reservation ID',
  })
  readonly reservationId: string;
}

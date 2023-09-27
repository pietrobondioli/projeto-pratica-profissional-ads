import { ApiProperty } from '@nestjs/swagger';

export class CancelReservationReqParamsDto {
  @ApiProperty({
    example: 'reservation-id-1',
    description: 'Reservation ID',
  })
  readonly reservationId: string;
}

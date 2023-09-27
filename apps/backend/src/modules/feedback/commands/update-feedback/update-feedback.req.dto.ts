import { ApiProperty } from '@nestjs/swagger';

export class UpdateFeedbackReqDto {
  @ApiProperty({
    example: 'reservation-id-1',
    description: 'Reservation ID',
  })
  readonly reservationId: string;

  @ApiProperty({
    example: 5,
    description: 'Rating',
  })
  readonly rating: number;

  @ApiProperty({
    example: 'This is a comment',
    description: 'Comment',
  })
  readonly comment: string;
}

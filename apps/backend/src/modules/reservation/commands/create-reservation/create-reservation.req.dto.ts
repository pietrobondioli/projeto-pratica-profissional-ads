import { ApiProperty } from '@nestjs/swagger';

export class CreateReservationReqDto {
  @ApiProperty({
    example: 'equipment-id-1',
    description: 'Equipment ID',
  })
  readonly equipmentId: string;

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
}

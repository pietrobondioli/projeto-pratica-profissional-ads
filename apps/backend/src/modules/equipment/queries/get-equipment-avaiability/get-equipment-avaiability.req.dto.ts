import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class GetEquipmentAvailabilityReqDto {
  @Expose()
  @ApiProperty({
    description: 'The start date of the range to look for availability',
    type: Date,
  })
  readonly startDate: Date;

  @Expose()
  @ApiProperty({
    description: 'The end date of the range to look for availability',
    type: Date,
  })
  readonly endDate: Date;
}

import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class IdResponse {
  constructor(id: string) {
    this.id = id;
  }

  @Expose()
  @ApiProperty({
    example: '2cdc8ab1-6d50-49cc-ba14-54e4ac7ec231',
    description: 'ID of the entity',
  })
  readonly id: string;
}

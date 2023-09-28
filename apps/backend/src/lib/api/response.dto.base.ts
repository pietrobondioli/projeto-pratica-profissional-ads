import { ApiProperty } from '@nestjs/swagger';

import { Expose } from 'class-transformer';
import { IdResponse } from './id.response.dto';

export class ResponseBase extends IdResponse {
  @Expose()
  @ApiProperty({
    example: '2020-11-24T17:43:15.970Z',
    description: 'Date of creation',
  })
  readonly createdAt: string;

  @Expose()
  @ApiProperty({
    example: '2020-11-24T17:43:15.970Z',
    description: 'Date of last update',
  })
  readonly updatedAt: string;
}

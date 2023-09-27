import { ApiProperty } from '@nestjs/swagger';

export abstract class PaginatedResponseDto<T> {
  @ApiProperty({
    example: 5312,
    description: 'Total number of items',
  })
  readonly total: number;

  @ApiProperty({
    example: 10,
    description: 'Number of items per page',
  })
  readonly limit: number;

  @ApiProperty({ example: 0, description: 'Page number' })
  readonly page: number;

  @ApiProperty({ isArray: true })
  readonly items: readonly T[];
}

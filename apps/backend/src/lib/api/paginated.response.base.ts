import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export abstract class PaginatedResponseDto<T> {
  @Expose()
  @ApiProperty({
    example: 5312,
    description: 'Total number of items',
  })
  readonly total: number;

  @Expose()
  @ApiProperty({
    example: 10,
    description: 'Number of items per page',
  })
  readonly limit: number;

  @Expose()
  @ApiProperty({ example: 0, description: 'Page number' })
  readonly page: number;

  @Expose()
  @ApiProperty({ example: false, description: 'Whether there are more items' })
  readonly hasMore: boolean;

  public abstract items: T[];
}

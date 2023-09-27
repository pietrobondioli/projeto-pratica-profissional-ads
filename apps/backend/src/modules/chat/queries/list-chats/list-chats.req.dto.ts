import { PaginatedQueryRequestDto } from '#/be/lib/api/paginated-query.request.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class ListChatsReqDto extends PaginatedQueryRequestDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'John',
    description: 'User name to search for',
  })
  readonly targetUserSearch: string;
}

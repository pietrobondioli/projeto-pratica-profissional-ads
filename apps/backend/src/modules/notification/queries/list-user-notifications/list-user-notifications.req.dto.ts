import { PaginatedQueryRequestDto } from '#/be/lib/api/paginated-query.request.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class ListUserNotificationsReqDto extends PaginatedQueryRequestDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'user-id',
    description: 'User ID',
  })
  readonly userId: string;
}

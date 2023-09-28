import { ApiProperty } from '@nestjs/swagger';

import { PaginatedResponseDto } from '#/be/lib/api/paginated.response.base';
import { ResponseBase } from '#/be/lib/api/response.dto.base';
import { Expose, Type } from 'class-transformer';

class UserDto extends ResponseBase {
  @Expose()
  @ApiProperty({
    example: 'John',
    description: 'User first name',
  })
  readonly firstName: string;

  @Expose()
  @ApiProperty({
    example: 'Doe',
    description: 'User last name',
  })
  readonly lastName: string;
}

class ChatDto extends ResponseBase {
  @Expose()
  @Type(() => UserDto)
  @ApiProperty({
    type: () => UserDto,
    description: 'First user in the chat',
  })
  readonly user1: UserDto;

  @Expose()
  @Type(() => UserDto)
  @ApiProperty({
    type: () => UserDto,
    description: 'Second user in the chat',
  })
  readonly user2: UserDto;
}

export class ListChatsResDto extends PaginatedResponseDto<ChatDto> {}

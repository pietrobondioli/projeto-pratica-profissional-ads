import { ApiProperty } from '@nestjs/swagger';

import { PaginatedResponseDto } from '#/be/lib/api/paginated.response.base';
import { ResponseBase } from '#/be/lib/api/response.dto.base';

class UserDto extends ResponseBase {
  @ApiProperty({
    example: 'John',
    description: 'User first name',
  })
  readonly firstName: string;

  @ApiProperty({
    example: 'Doe',
    description: 'User last name',
  })
  readonly lastName: string;
}

class ChatDto extends ResponseBase {
  @ApiProperty({
    type: () => UserDto,
    description: 'First user in the chat',
  })
  readonly user1: UserDto;

  @ApiProperty({
    type: () => UserDto,
    description: 'Second user in the chat',
  })
  readonly user2: UserDto;
}

export class ListChatsResDto extends PaginatedResponseDto<ChatDto> {}

import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

import { PaginatedResponseDto } from '#/be/lib/api/paginated.response.base';
import { ResponseBase } from '#/be/lib/api/response.dto.base';

class UserProfileDto {
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

class UserDto extends ResponseBase {
  @Expose()
  @Type(() => UserProfileDto)
  @ApiProperty({
    type: () => UserProfileDto,
    description: 'User profile',
  })
  readonly userProfile: UserProfileDto;
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

export class ListChatsResDto extends PaginatedResponseDto<ChatDto> {
  @Expose()
  @Type(() => ChatDto)
  @ApiProperty({
    description: 'Array of chats',
    type: () => [ChatDto],
    isArray: true,
  })
  readonly items: ChatDto[];
}

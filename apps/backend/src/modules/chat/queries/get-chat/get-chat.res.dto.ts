import { ApiProperty } from '@nestjs/swagger';

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

class ChatMessageDto extends ResponseBase {
  @Expose()
  @ApiProperty({
    example: 'Hello, John!',
    description: 'Content of the chat message',
  })
  content: string;

  @Expose()
  @Type(() => UserDto)
  @ApiProperty({
    type: () => UserDto,
    description: 'User who sent the message',
  })
  sender: UserDto;
}

export class GetChatResDto extends ResponseBase {
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

  @Expose()
  @Type(() => ChatMessageDto)
  @ApiProperty({
    type: () => [ChatMessageDto],
    description: 'Array of messages in the chat',
  })
  messages: ChatMessageDto[];
}

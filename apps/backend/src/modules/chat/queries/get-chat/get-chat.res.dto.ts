import { ApiProperty } from '@nestjs/swagger';

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

class ChatMessageDto extends ResponseBase {
  @ApiProperty({
    example: 'Hello, John!',
    description: 'Content of the chat message',
  })
  content: string;

  @ApiProperty({
    type: () => UserDto,
    description: 'User who sent the message',
  })
  sender: UserDto;
}

export class GetChatResDto extends ResponseBase {
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

  @ApiProperty({
    type: () => [ChatMessageDto],
    description: 'Array of messages in the chat',
  })
  messages: ChatMessageDto[];
}

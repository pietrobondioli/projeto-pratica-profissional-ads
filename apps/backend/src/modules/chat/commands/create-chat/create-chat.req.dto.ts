import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateChatReqDto {
  @ApiProperty({
    example: 'user-id-1',
    description: 'The user id of the user to create a chat with',
  })
  @IsString()
  @IsNotEmpty()
  readonly withUserId: string;

  @ApiProperty({
    example: 'Hello, how are you?',
    description: 'The first message of the chat',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(2000)
  readonly message: string;
}

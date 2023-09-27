import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class SendMessageReqDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'chat-id-1',
    description: 'Chat ID',
  })
  readonly chatId: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(2000)
  @ApiProperty({
    example: 'Hello, world!',
    description: 'Message',
  })
  readonly message: string;
}

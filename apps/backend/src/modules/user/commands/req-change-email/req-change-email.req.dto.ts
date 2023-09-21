import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MaxLength, MinLength } from 'class-validator';

export class ReqChangeEmailRequestDto {
  @ApiProperty({
    example: 'john@gmail.com',
    description: 'User email address',
  })
  @MaxLength(320)
  @MinLength(5)
  @IsEmail()
  readonly newEmail: string;
}

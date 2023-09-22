import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MaxLength,
} from 'class-validator';

export class ChangePasswordRequestDto {
  @ApiProperty({
    example: 'some-random-token',
    description: 'Password reset token',
  })
  @IsString()
  @IsNotEmpty()
  readonly token: string;

  @ApiProperty({
    example: 'Abc1234-',
    description: 'User password',
  })
  @MaxLength(256)
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  readonly newPassword: string;
}

import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserProfileDto {
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

  @ApiProperty({
    example: '09123456789',
    description: 'User contact number',
  })
  readonly contact: string;

  @ApiProperty({
    example: 'Manila, Philippines',
    description: 'User address',
  })
  readonly address: string;

  @ApiProperty({
    example: 'This is a description',
    description: 'User description',
  })
  readonly description: string;

  @ApiProperty({
    example: 'uuid',
    description: 'User profile picture id',
  })
  readonly profilePictureId?: string;
}

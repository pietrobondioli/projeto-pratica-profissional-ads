import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserProfileDto {
  @ApiPropertyOptional({
    example: 'John',
    description: 'User first name',
  })
  readonly firstName?: string;

  @ApiPropertyOptional({
    example: 'Doe',
    description: 'User last name',
  })
  readonly lastName?: string;

  @ApiPropertyOptional({
    example: '09123456789',
    description: 'User contact number',
  })
  readonly contact?: string;

  @ApiPropertyOptional({
    example: 'Manila, Philippines',
    description: 'User address',
  })
  readonly address?: string;

  @ApiPropertyOptional({
    example: 'This is a description',
    description: 'User description',
  })
  readonly description?: string;

  @ApiPropertyOptional({
    example: 'uuid',
    description: 'User profile picture id',
  })
  readonly profilePictureId?: string;
}

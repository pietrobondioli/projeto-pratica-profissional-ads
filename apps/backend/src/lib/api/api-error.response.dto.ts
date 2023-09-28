import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ApiErrorResponse {
  @ApiProperty({ example: 'Validation Error' })
  readonly message: string;

  @ApiProperty({ example: 'VALIDATION_ERROR' })
  readonly code: string;

  @ApiPropertyOptional({
    example: 'Error: Incorrect email',
    description: 'Optional cause of the error',
    nullable: true,
    required: false,
  })
  readonly cause?: string;

  @ApiPropertyOptional({
    example: 'Error at validateUser function',
    description: 'Optional stack trace of the error',
    nullable: true,
    required: false,
  })
  readonly stack?: string;

  @ApiPropertyOptional({
    example: { field: 'email', issue: 'Email is invalid' },
    description: 'Optional metadata about the error',
    nullable: true,
    required: false,
  })
  readonly metadata?: unknown;

  constructor(body: ApiErrorResponse) {
    this.message = body.message;
    this.code = body.code;
    this.cause = body.cause;
    this.stack = body.stack;
    this.metadata = body.metadata;
  }
}

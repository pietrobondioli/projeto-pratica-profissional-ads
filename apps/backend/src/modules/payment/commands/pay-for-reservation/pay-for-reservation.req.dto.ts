import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { PaymentMethod } from '../../domain/payment.entity';

export class PayForReservationReqDto {
  @ApiProperty({
    description: 'The reservation id',
  })
  readonly reservationId: string;

  @IsEnum(PaymentMethod)
  @ApiProperty({
    example: PaymentMethod.CREDIT_CARD,
    type: 'enum',
    enum: PaymentMethod,
    description: 'Payment method',
  })
  readonly paymentMethod: PaymentMethod;
}

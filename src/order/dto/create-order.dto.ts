import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { BaseCreateDTO, IsPositiveDecimal, IsValidId } from '../../shared';

export class CreateOrderDTO extends BaseCreateDTO {
  @IsPositiveDecimal()
  @IsNotEmpty()
  taxPrice: number;

  @IsPositiveDecimal()
  @IsNotEmpty()
  shippingPrice: number;

  @IsPositiveDecimal()
  @IsNotEmpty()
  totalPrice: number;

  @IsString()
  @IsNotEmpty()
  paymentMethod: string;

  @IsValidId()
  @IsOptional()
  fkPaymentResultId: number;

  @IsValidId()
  @IsOptional()
  fkShippingAddressId: number;

  @IsValidId()
  @IsOptional()
  fkUserId: number;
}

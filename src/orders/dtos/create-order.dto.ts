import { IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  product!: string;

  @IsNumber()
  @Min(0)
  @Max(100)
  quantity!: number;

  @IsNumber()
  @Min(0)
  total!: number;
}

import { Expose } from 'class-transformer';

export class OrderDto {
  @Expose()
  id!: number;

  @Expose()
  product!: string;

  @Expose()
  quantity!: number;

  @Expose()
  total!: number;

  @Expose()
  completed!: boolean;

  @Expose()
  userId!: number;
}

import { Expose, Transform } from 'class-transformer';

export class OrderDto {
  @Expose()
  id!: number;

  @Expose()
  product!: string;

  @Expose()
  quantity!: number;

  @Expose()
  total!: number;

  @Transform(({ obj }: { obj: { user: { id: number } } }) => obj.user.id)
  @Expose()
  userId!: number;
}

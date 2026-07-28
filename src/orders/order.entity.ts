import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  product!: string;

  @Column()
  quantity!: number;

  @Column()
  total!: number;

  @ManyToOne(() => User, (user) => user.orders)
  user!: User;
}

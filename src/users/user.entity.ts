import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from '../orders/order.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  surname!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @OneToMany(() => Order, (order) => order.user)
  orders!: Order[];

  @AfterUpdate()
  logUpdate() {
    console.log(`User with id ${this.id} has been updated.`);
  }

  @AfterInsert()
  logInsert() {
    console.log(`User with id ${this.id} has been created.`);
  }

  @AfterRemove()
  logRemove() {
    console.log(`User with id ${this.id} has been removed.`);
  }
}

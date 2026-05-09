import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

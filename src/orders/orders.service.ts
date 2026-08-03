import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dtos/create-order.dto';
import { User } from '../users/user.entity';

@Injectable()
export class OrdersService {
  constructor(@InjectRepository(Order) private repo: Repository<Order>) {}

  create(orderDto: CreateOrderDto, user: User) {
    const order = this.repo.create(orderDto);
    order.user = user;
    return this.repo.save(order);
  }

  async setStatusCompleted(id: number) {
    const order = await this.repo.findOneBy({ id });
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    order.completed = true;
    return this.repo.save(order);
  }

  async findUserOrders(user: User) {
    return this.repo.find({ where: { user } });
  }
}

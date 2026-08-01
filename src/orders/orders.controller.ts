import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dtos/create-order.dto';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/user.entity';
import { Serialize } from '../interceptors/serialize.interceptor';
import { OrderDto } from './dtos/order.dto';
import { AuthGuard } from '../guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('/orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('/create')
  @Serialize(OrderDto)
  createOrder(@Body() body: CreateOrderDto, @CurrentUser() user: User) {
    return this.ordersService.create(body, user);
  }
}

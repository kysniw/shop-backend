import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dtos/create-order.dto';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/user.entity';
import { Serialize } from '../interceptors/serialize.interceptor';
import { OrderDto } from './dtos/order.dto';
import { AuthGuard } from '../guards/auth.guard';
import { AdminGuard } from '../guards/admin.guard';

@Controller('/orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('/create')
  @UseGuards(AuthGuard)
  @Serialize(OrderDto)
  createOrder(@Body() body: CreateOrderDto, @CurrentUser() user: User) {
    return this.ordersService.create(body, user);
  }

  @Patch('/complete/:id')
  @UseGuards(AdminGuard)
  completeOrder(@Param('id') id: number) {
    return this.ordersService.setStatusCompleted(id);
  }

  @Get('/my-orders')
  @UseGuards(AuthGuard)
  @Serialize(OrderDto)
  getUserOrders(@CurrentUser() user: User) {
    return this.ordersService.findUserOrders(user);
  }
}

import { Body, Controller, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { createOrderDto } from './dto/order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  placeOrder(@Body() orderDto: createOrderDto) {
    return this.orderService.placeOrder(orderDto);
  }
}

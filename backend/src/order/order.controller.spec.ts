import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

describe('OrderController', () => {
  let orderController: OrderController;
  let orderService: OrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [OrderService],
    })
      .overrideProvider(OrderService)
      .useValue({
        placeOrder: jest.fn().mockResolvedValue({
          email: 'dmitriytest@mail.ru',
          phone: '+79633235678',
          tickets: [
            {
              film: '0e33c7f6-27a7-4aa0-8e61-65d7e5effecf',
              session: 'f2e429b0-685d-41f8-a8cd-1d8cb63b99ce',
              daytime: '2024-06-28T10:00:53+03:00',
              row: 1,
              seat: 1,
              price: 350,
            },
            {
              film: '0e33c7f6-27a7-4aa0-8e61-65d7e5effecf',
              session: 'f2e429b0-685d-41f8-a8cd-1d8cb63b99ce',
              daytime: '2024-06-28T10:00:53+03:00',
              row: 1,
              seat: 2,
              price: 350,
            },
          ],
        }),
      })
      .compile();

    orderController = module.get<OrderController>(OrderController);
    orderService = module.get<OrderService>(OrderService);
  });

  it('should call placeOrder() from service', async () => {
    const tickets = [
      {
        film: '0e33c7f6-27a7-4aa0-8e61-65d7e5effecf',
        session: 'f2e429b0-685d-41f8-a8cd-1d8cb63b99ce',
        daytime: '2024-06-28T10:00:53+03:00',
        row: 1,
        seat: 1,
        price: 350,
      },
      {
        film: '0e33c7f6-27a7-4aa0-8e61-65d7e5effecf',
        session: 'f2e429b0-685d-41f8-a8cd-1d8cb63b99ce',
        daytime: '2024-06-28T10:00:53+03:00',
        row: 1,
        seat: 2,
        price: 350,
      },
    ];
    const order = await orderController.placeOrder({
      email: 'dmitriytest@mail.ru',
      phone: '+79633235678',
      tickets: tickets,
    });

    expect(order).toEqual({
      email: 'dmitriytest@mail.ru',
      phone: '+79633235678',
      tickets: tickets,
    });
    expect(orderService.placeOrder).toHaveBeenCalledWith({
      email: 'dmitriytest@mail.ru',
      phone: '+79633235678',
      tickets: tickets,
    });
  });
});

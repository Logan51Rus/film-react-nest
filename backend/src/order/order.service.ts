import { ConflictException, Injectable } from '@nestjs/common';
import { createOrderDto } from './dto/order.dto';
import { Schedule } from 'src/films/films.schema';
import { FilmsMongoDbRepository } from 'src/repository/films.mongodb.repository';

@Injectable()
export class OrderService {
  constructor(private readonly filmsRepository: FilmsMongoDbRepository) {}

  async placeOrder(orderDto: createOrderDto) {
    const { tickets } = orderDto;

    for (const ticket of tickets) {
      const { film, session, row, seat } = ticket;
      const selectedFilm = await this.filmsRepository.findFilmById(film);

      const schedule: Schedule = selectedFilm.schedule.find(
        (s) => s.id === session,
      );

      const orderedSeat = `${row}:${seat}`;
      if (schedule.taken.includes(orderedSeat)) {
        throw new ConflictException('К сожалению, место уже занято');
      }

      schedule.taken.push(orderedSeat);

      await selectedFilm.save();
    }

    return {
      total: tickets.length,
      items: tickets,
    };
  }
}

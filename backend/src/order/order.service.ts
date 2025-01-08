import { ConflictException, Injectable } from '@nestjs/common';
import { createOrderDto } from './dto/order.dto';
import { FilmsMongoDbRepository } from 'src/repository/films.mongodb.repository';
import { FilmsPostgresSQLRepository } from 'src/repository/films.postgres.repository';

@Injectable()
export class OrderService {
  constructor(
    private readonly filmsMongoRepository: FilmsMongoDbRepository,
    private readonly filmsPostgresRepository: FilmsPostgresSQLRepository,
  ) {}

  async placeOrder(orderDto: createOrderDto) {
    const { tickets } = orderDto;

    for (const ticket of tickets) {
      const { film, session, row, seat } = ticket;
      let selectedFilm;
      const bookedPlace = `${row}:${seat}`;

      if (process.env.DATABASE_DRIVER === 'mongodb') {
        selectedFilm = await this.filmsMongoRepository.findFilmById(film);
      } else {
        selectedFilm = await this.filmsPostgresRepository.findFilmById(film);
      }

      const schedule = selectedFilm.schedule.find((s) => s.id === session);

      const isTaken = Array.isArray(schedule.taken)
        ? schedule.taken.includes(bookedPlace)
        : schedule.taken?.split(',').includes(bookedPlace);

      if (isTaken)
        throw new ConflictException('К сожалению, место уже занято.');

      if (Array.isArray(schedule.taken)) {
        schedule.taken.push(bookedPlace);
      } else {
        schedule.taken = schedule.taken
          ? `${schedule.taken},${bookedPlace}`
          : bookedPlace;
      }

      if (process.env.DATABASE_DRIVER === 'mongodb') {
        await selectedFilm.save();
      } else {
        console.log('Updated selectedFilm:', selectedFilm);
        await this.filmsPostgresRepository.save(selectedFilm);
      }
    }

    return {
      total: tickets.length,
      items: tickets,
    };
  }
}

import {
  ConflictException,
  BadRequestException,
  Injectable,
  Inject,
} from '@nestjs/common';
import { createOrderDto } from './dto/order.dto';
import { FilmsPostgresSQLRepository } from 'src/repository/films.postgres.repository';
import { FilmsMongoDbRepository } from 'src/repository/films.mongodb.repository';
import { AppConfig } from 'src/app.config.provider';

@Injectable()
export class OrderService {
  constructor(
    @Inject('CONFIG') private readonly config: AppConfig,
    private readonly filmsMongoRepository: FilmsMongoDbRepository,
    private readonly filmsPostgresRepository: FilmsPostgresSQLRepository,
  ) {}

  async placeOrder(orderDto: createOrderDto) {
    const { tickets } = orderDto;

    for (const ticket of tickets) {
      const { film, session, row, seat } = ticket;
      let selectedFilm;

      if (this.config.database.driver === 'mongodb') {
        selectedFilm = await this.filmsMongoRepository.findFilmById(film);
      } else if (this.config.database.driver === 'postgres') {
        selectedFilm = await this.filmsPostgresRepository.findFilmById(film);
      }

      const schedule = selectedFilm.schedule.find((s) => s.id === session);
      if (!schedule) throw new BadRequestException('Сеанс не найден');

      if (row > schedule.rows || seat > schedule.seats)
        throw new BadRequestException('Выбранного места не существует');

      const bookedPlace = `${row}:${seat}`;

      const isTaken = Array.isArray(schedule.taken)
        ? schedule.taken.includes(bookedPlace)
        : schedule.taken.split(',').includes(bookedPlace);

      if (isTaken)
        throw new ConflictException('К сожалению, место уже занято.');

      if (Array.isArray(schedule.taken)) {
        schedule.taken.push(bookedPlace);
      } else {
        schedule.taken = schedule.taken
          ? `${schedule.taken},${bookedPlace}`
          : bookedPlace;
      }

      if (this.config.database.driver === 'mongodb') {
        await selectedFilm.save();
      } else if (this.config.database.driver === 'postgres') {
        await this.filmsPostgresRepository.save(selectedFilm);
      }
    }

    return {
      total: tickets.length,
      items: tickets,
    };
  }
}

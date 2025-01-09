import {
  ConflictException,
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { createOrderDto } from './dto/order.dto';
import { FilmsPostgresSQLRepository } from 'src/repository/films.postgres.repository';

@Injectable()
export class OrderService {
  constructor(
    private readonly filmsPostgresRepository: FilmsPostgresSQLRepository,
  ) {}

  async placeOrder(orderDto: createOrderDto) {
    const { tickets } = orderDto;

    for (const ticket of tickets) {
      const { film, session, row, seat } = ticket;
      const selectedFilm =
        await this.filmsPostgresRepository.findFilmById(film);

      const schedule = selectedFilm.schedule.find((s) => s.id === session);

      if (!schedule) {
        throw new NotFoundException('Сеанс не найден.');
      }

      if (row > schedule.rows || seat > schedule.seats) {
        throw new BadRequestException('Выбранного места не существует.');
      }

      const selectedSeat = `${row}:${seat}`;

      const isTaken = schedule.taken?.split(',').includes(selectedSeat);

      if (isTaken) {
        throw new ConflictException('К сожалению, место уже занято.');
      } else {
        schedule.taken = schedule.taken
          ? `${schedule.taken},${selectedSeat}`
          : selectedSeat;
      }

      await this.filmsPostgresRepository.save(selectedFilm);
    }

    return {
      total: tickets.length,
      items: tickets,
    };
  }
}

import { Injectable } from '@nestjs/common';
import { FilmsPostgresSQLRepository } from 'src/repository/films.postgres.repository';

@Injectable()
export class FilmsService {
  constructor(
    private readonly filmsPostgresRepository: FilmsPostgresSQLRepository,
  ) {}

  getAllFilms() {
    return this.filmsPostgresRepository.getAllFilms();
  }

  getScheduleById(id: string) {
    return this.filmsPostgresRepository.getScheduleById(id);
  }
}

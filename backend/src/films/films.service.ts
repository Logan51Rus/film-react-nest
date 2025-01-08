import { Injectable } from '@nestjs/common';
import { FilmsMongoDbRepository } from 'src/repository/films.mongodb.repository';
import { FilmsPostgresSQLRepository } from 'src/repository/films.postgres.repository';

@Injectable()
export class FilmsService {
  constructor(
    private readonly filmsMongoRepository: FilmsMongoDbRepository,
    private readonly filmsPostgresRepository: FilmsPostgresSQLRepository,
  ) {}

  getAllFilms() {
    if (process.env.DATABASE_DRIVER === 'mongodb') {
      return this.filmsMongoRepository.getAllFilms();
    } else {
      return this.filmsPostgresRepository.getAllFilms();
    }
  }

  getScheduleById(id: string) {
    if (process.env.DATABASE_DRIVER === 'mongodb') {
      return this.filmsMongoRepository.getScheduleById(id);
    } else {
      return this.filmsPostgresRepository.getScheduleById(id);
    }
  }
}

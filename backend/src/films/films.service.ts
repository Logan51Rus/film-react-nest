import { Injectable, Inject } from '@nestjs/common';
import { FilmsPostgresSQLRepository } from 'src/repository/films.postgres.repository';
import { FilmsMongoDbRepository } from 'src/repository/films.mongodb.repository';
import { AppConfig } from 'src/app.config.provider';

@Injectable()
export class FilmsService {
  constructor(
    @Inject('CONFIG') private readonly config: AppConfig,
    private readonly filmsMongoRepository: FilmsMongoDbRepository,
    private readonly filmsPostgresRepository: FilmsPostgresSQLRepository,
  ) {}

  async getAllFilms() {
    if (this.config.database.driver === 'mongodb') {
      return await this.filmsMongoRepository.getAllFilms();
    } else if (this.config.database.driver === 'postgres') {
      return await this.filmsPostgresRepository.getAllFilms();
    }
  }

  async getScheduleById(id: string) {
    if (this.config.database.driver === 'mongodb') {
      return await this.filmsMongoRepository.getScheduleById(id);
    } else if (this.config.database.driver === 'postgres') {
      return await this.filmsPostgresRepository.getScheduleById(id);
    }
  }
}

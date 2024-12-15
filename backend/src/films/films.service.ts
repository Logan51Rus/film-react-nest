import { Injectable } from '@nestjs/common';
import { FilmsMongoDbRepository } from 'src/repository/films.mongodb.repository';

@Injectable()
export class FilmsService {
  constructor(private readonly filmsRepository: FilmsMongoDbRepository) {}

  getAllFilms() {
    return this.filmsRepository.getAllFilms();
  }

  getScheduleById(id: string) {
    return this.filmsRepository.getScheduleById(id);
  }
}

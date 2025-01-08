import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FilmEntity } from 'src/films/entities/Film.entity';
import { ScheduleEntity } from 'src/films/entities/Schedule.entity';

@Injectable()
export class FilmsPostgresSQLRepository {
  constructor(
    @InjectRepository(FilmEntity)
    private readonly filmRepository: Repository<FilmEntity>,
  ) {}

  async getAllFilms(): Promise<{ total: number; items: FilmEntity[] }> {
    const [total, items] = await Promise.all([
      this.filmRepository.count(),
      this.filmRepository.find({
        relations: {
          schedule: true,
        },
      }),
    ]);

    return {
      total,
      items,
    };
  }

  async findFilmById(id: string) {
    const film = await this.filmRepository.findOne({
      where: {
        id,
      },
      relations: {
        schedule: true,
      },
    });

    if (!film) {
      throw new NotFoundException(`Фильма с id ${id} нет в базе данных`);
    }

    return film;
  }

  async getScheduleById(
    id: string,
  ): Promise<{ total: number; items: ScheduleEntity[] | null }> {
    const film = await this.findFilmById(id);

    return {
      total: film.schedule.length,
      items: film.schedule,
    };
  }

  async save(film: FilmEntity) {
    await this.filmRepository.save(film);
  }
}

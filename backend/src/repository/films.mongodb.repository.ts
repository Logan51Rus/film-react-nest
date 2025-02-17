import { NotFoundException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GetFilmDto } from 'src/films/dto/films.dto';
import { Film } from 'src/films/films.schema';
import { GetScheduleDto } from 'src/films/dto/schedule.dto';

@Injectable()
export class FilmsMongoDbRepository {
  constructor(
    @InjectModel(Film.name) private readonly filmModel: Model<Film>,
  ) {}

  private getFilmMapperFn(): (film: Film) => GetFilmDto {
    return (root) => {
      return {
        id: root.id,
        rating: root.rating,
        director: root.director,
        tags: root.tags,
        image: root.image,
        cover: root.cover,
        title: root.title,
        about: root.about,
        description: root.description,
        schedule: root.schedule,
      };
    };
  }

  async getAllFilms(): Promise<{ total: number; items: GetFilmDto[] }> {
    const films = await this.filmModel.find({});
    const total = await this.filmModel.countDocuments({});

    return {
      total: total,
      items: films.map(this.getFilmMapperFn()),
    };
  }

  async getScheduleById(
    id: string,
  ): Promise<{ total: number; items: GetScheduleDto[] | null }> {
    const film = await this.filmModel.findOne({ id });

    if (!film) {
      throw new NotFoundException(`Фильма с id ${id} нет в базе данных`);
    }

    return {
      total: film.schedule.length,
      items: film.schedule,
    };
  }

  async findFilmById(id: string) {
    const film = await this.filmModel.findOne({ id });
    return film;
  }
}

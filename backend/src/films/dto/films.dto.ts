import { GetScheduleDto } from './schedule.dto';
import { IsFQDN, IsNotEmpty, IsNumber, IsString } from 'class-validator';

//TODO описать DTO для запросов к /films
export class GetFilmDto {
  @IsString()
  id: string;
  @IsNumber()
  rating: number;
  @IsString()
  director: string;
  @IsNotEmpty()
  tags: string[];
  @IsFQDN()
  image: string;
  @IsFQDN()
  cover: string;
  @IsString()
  title: string;
  @IsString()
  about: string;
  @IsString()
  description: string;
  @IsNotEmpty()
  schedule: GetScheduleDto[];
}

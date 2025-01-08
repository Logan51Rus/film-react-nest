import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import * as path from 'node:path';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';

import { configProvider } from './app.config.provider';
import { FilmsController } from './films/films.controller';
import { FilmsService } from './films/films.service';
import { OrderController } from './order/order.controller';
import { OrderService } from './order/order.service';
import { FilmsMongoDbRepository } from './repository/films.mongodb.repository';
import { Film, FilmSchema } from './films/schemas/films.schema';
import { ScheduleEntity } from './films/entities/Schedule.entity';
import { FilmEntity } from './films/entities/Film.entity';
import { FilmsPostgresSQLRepository } from './repository/films.postgres.repository';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    //Подключение Mongoose для работы с MongoDB
    MongooseModule.forRoot(process.env.DATABASE_URL),
    MongooseModule.forFeature([{ name: Film.name, schema: FilmSchema }]),

    //Подключение TypeORM для работы с PostgresSQL
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST || 'localhost',
      port: +process.env.POSTGRES_PORT || 5432,
      username: process.env.POSTGRES_USER || 'developer',
      password: process.env.POSTGRES_PASSWORD || 'developer',
      database: process.env.POSTGRES_DB || 'film_project',
      entities: [FilmEntity, ScheduleEntity],
      synchronize: false,
    }),
    TypeOrmModule.forFeature([FilmEntity, ScheduleEntity]),

    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'public'),
    }),
  ],
  controllers: [FilmsController, OrderController],
  providers: [
    configProvider,
    FilmsService,
    OrderService,
    FilmsMongoDbRepository,
    FilmsPostgresSQLRepository,
  ],
})
export class AppModule {}

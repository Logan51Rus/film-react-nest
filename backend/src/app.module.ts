import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import * as path from 'node:path';
import { configProvider } from './app.config.provider';
import { FilmsController } from './films/films.controller';
import { FilmsService } from './films/films.service';
import { OrderController } from './order/order.controller';
import { OrderService } from './order/order.service';
import { DatabaseModule } from './database/database.module';
import { FilmsPostgresSQLRepository } from './repository/films.postgres.repository';
import { filmsProvider } from './films/films.provider';
import { FilmsMongoDbRepository } from './repository/films.mongodb.repository';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'public'),
    }),
    DatabaseModule,
  ],
  controllers: [FilmsController, OrderController],
  providers: [
    configProvider,
    FilmsService,
    OrderService,
    FilmsMongoDbRepository,
    FilmsPostgresSQLRepository,
    filmsProvider,
  ],
})
export class AppModule {}

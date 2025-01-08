import { ConfigModule } from '@nestjs/config';

export const configProvider = {
  imports: [ConfigModule.forRoot()],
  provide: 'CONFIG',
  useValue: <AppConfig>{
    //TODO прочесть переменнные среды
    database: {
      driver: process.env.DATABASE_DRIVER || 'mongodb',
      url:
        process.env.DATABASE_DRIVER === 'postgres'
          ? process.env.POSTGRES_URL ||
            'postgres://developer:developer@localhost:5432/film_project'
          : process.env.DATABASE_URL || 'mongodb://localhost:27017/afisha',
    },
  },
};

export interface AppConfig {
  database: AppConfigDatabase;
}

export interface AppConfigDatabase {
  driver: string;
  url: string;
}

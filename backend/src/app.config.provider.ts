import { ConfigModule } from '@nestjs/config';

export const configProvider = {
  imports: [ConfigModule.forRoot()],
  provide: 'CONFIG',
  useValue: <AppConfig>{
    database: {
      driver: process.env.DATABASE_DRIVER || 'postgres',
      url:
        process.env.DATABASE_URL ||
        'postgres://developer:developer@localhost:5432/film_project',
      host: process.env.DATABASE_HOST || 'localhost',
      port: process.env.DATABASE_PORT || 5432,
      user: process.env.DATABASE_USER || 'developer',
      password: process.env.DATABASE_USER || 'developer',
      name: process.env.DATABASE_NAME || 'film_project',
    },
  },
};

export interface AppConfig {
  database: AppConfigDatabase;
}

export interface AppConfigDatabase {
  driver: string;
  url: string;
  host: string;
  port: number;
  user: string;
  password: string;
  name: string;
}

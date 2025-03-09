import { ConfigModule } from '@nestjs/config';

const applicationConfig = process.env;

export const configProvider = {
  imports: [ConfigModule.forRoot()],
  provide: 'CONFIG',
  useValue: <AppConfig>{
    database: {
      driver: applicationConfig.DATABASE_DRIVER,
      url: applicationConfig.DATABASE_URL,
      host: applicationConfig.DATABASE_HOST,
      port: +applicationConfig.DATABASE_PORT,
      user: applicationConfig.DATABASE_USER,
      password: applicationConfig.DATABASE_PASSWORD,
      name: applicationConfig.DATABASE_NAME,
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

import { Environment } from './environment.enum';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export type Configuration = {
  api: ApiConfiguration;
  db: DbConfiguration;
};

export type DbConfiguration = PostgresConnectionOptions;

export type ApiConfiguration = {
  env: Environment;
  port: number;
  jwtSecret: string;
  jwtExpiresIn: string;
};

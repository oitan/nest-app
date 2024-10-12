import { Environment } from './environment.enum';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export type Configuration = {
  env: Environment;
  api: ApiConfiguration;
  db: DbConfiguration;
};

export type DbConfiguration = PostgresConnectionOptions;

export type ApiConfiguration = {
  port: number;
  jwtSecret: string;
  jwtExpiresIn: string;
};

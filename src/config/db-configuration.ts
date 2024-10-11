import { DbConfiguration } from './configuration.type';
import { EnvironmentVariables } from './environment-variables';

export function getDbConfiguration(env: EnvironmentVariables): DbConfiguration {
  return {
    type: 'postgres',
    host: env.DB_HOST,
    port: env.DB_PORT,
    username: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    entities: [],
    logging: true,
    synchronize: false,
  };
}

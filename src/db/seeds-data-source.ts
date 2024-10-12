import { getDbConfiguration } from 'src/config/db-configuration';
import { validateEnvironmentVariables } from 'src/config/env-validation';
import { DataSource } from 'typeorm';

const env = validateEnvironmentVariables(process.env);
export const migrationsDataSource = new DataSource({
  ...getDbConfiguration(env),
  migrations: ['src/db/seeds/*.ts'],
  migrationsTableName: 'seeds',
});

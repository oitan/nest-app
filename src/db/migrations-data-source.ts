import { DataSource } from 'typeorm';
import { validateEnvironmentVariables } from 'src/config/env-validation';
import { getDbConfiguration } from 'src/config/db-configuration';

const env = validateEnvironmentVariables(process.env);
export const migrationsDataSource = new DataSource({
  ...getDbConfiguration(env),
  migrations: ['src/db/migrations/*.ts'],
  migrationsTableName: 'migrations',
});

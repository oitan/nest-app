import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { DbConfiguration } from './configuration.type';
import { EnvironmentVariables } from './environment-variables';
import { User } from 'src/users/entities/user.entity';

export function getDbConfiguration(env: EnvironmentVariables): DbConfiguration {
  return {
    type: 'postgres',
    host: env.DB_HOST,
    port: env.DB_PORT,
    username: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    entities: [User],
    logging: true,
    synchronize: false,
    namingStrategy: new SnakeNamingStrategy(),
  };
}

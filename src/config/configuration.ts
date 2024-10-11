import { Configuration } from './configuration.type';
import { getDbConfiguration } from './db-configuration';
import { validateEnvironmentVariables } from './env-validation';

export function getConfiguration(): Configuration {
  const env = validateEnvironmentVariables(process.env);

  return {
    api: {
      env: env.NODE_ENV,
      port: env.PORT,
      jwtSecret: env.JWT_SECRET,
      jwtExpiresIn: env.JWT_EXPIRES_IN,
    },
    db: getDbConfiguration(env),
  };
}

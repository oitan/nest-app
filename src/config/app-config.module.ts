import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppConfigService } from './app-config.service';
import { validateEnvironmentVariables } from './env-validation';
import { getConfiguration } from './configuration';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [getConfiguration],
      validate: validateEnvironmentVariables,
    }),
  ],
  providers: [AppConfigService],
  exports: [AppConfigService],
})
export class AppConfigModule {}

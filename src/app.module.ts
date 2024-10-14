import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { LoggerModule } from 'nestjs-pino';
import { getLoggerConfig } from './core/logger.config';
import { CorrelationIdMiddleware } from './core/correlation-id.middleware';
import { AppConfigModule } from './config/app-config.module';
import { AppConfigService } from './config/app-config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbLoggerService } from './db/db-logger.service';
import { AuthModule } from './auth/auth.module';
import { AppJwtModule } from './auth/app-jwt.module';

@Module({
  imports: [
    AppConfigModule,
    LoggerModule.forRootAsync({
      useFactory: getLoggerConfig,
      inject: [AppConfigService],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async (
        appConfigService: AppConfigService,
        logger: DbLoggerService,
      ) => ({ ...appConfigService.db, logger }),
      extraProviders: [DbLoggerService],
      inject: [AppConfigService, DbLoggerService],
    }),
    AppJwtModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CorrelationIdMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}

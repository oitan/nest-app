import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SwaggerTheme, SwaggerThemeNameEnum } from 'swagger-themes';
import { Logger } from 'nestjs-pino';
import { Environment } from './config/environment.enum';
import { AppConfigService } from './config/app-config.service';
import { HttpExceptionsFilter } from './core/http-exceptions.filter';
import { ExpressAdapter } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.useLogger(app.get(Logger));

  const appConfigService = app.get(AppConfigService);

  const httpAdapterHost = app.get(HttpAdapterHost<ExpressAdapter>);
  app.useGlobalFilters(new HttpExceptionsFilter(httpAdapterHost));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
      transform: true,
      validateCustomDecorators: true,
    }),
  );

  const env = appConfigService.get('api.env');
  if (env === Environment.DEVELOPMENT) {
    bootstrapDocumentation(app);
  }

  await app.listen(appConfigService.get('api.port'));
}

function bootstrapDocumentation(app: INestApplication) {
  const theme = new SwaggerTheme();

  const config = new DocumentBuilder()
    .setTitle('Nest App')
    .setDescription('Nest App API')
    .setVersion('1.0')
    .addTag('app')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    jsonDocumentUrl: 'api/json',
    yamlDocumentUrl: 'api/yaml',
    explorer: true,
    customCss: theme.getBuffer(SwaggerThemeNameEnum.DRACULA),
  });
}

bootstrap();

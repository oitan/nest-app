import { Injectable } from '@nestjs/common';
import { ConfigService, PathImpl2 } from '@nestjs/config';
import { Configuration } from 'src/config/configuration.type';

@Injectable()
export class AppConfigService extends ConfigService<Configuration, true> {
  get(propertyPath: PathImpl2<Configuration>) {
    return super.get(propertyPath, { infer: true });
  }

  get env() {
    return this.get('env');
  }

  get api() {
    return this.get('api');
  }

  get db() {
    return this.get('db');
  }
}

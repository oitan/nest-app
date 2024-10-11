import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
  Max,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Environment } from './environment.enum';
import { MaxPortValue, MinPortValue } from 'src/core/port.const';

export class EnvironmentVariables {
  // API

  @IsEnum(Environment)
  NODE_ENV: Environment;

  @Type(() => Number)
  @IsNumber()
  @Min(MinPortValue)
  @Max(MaxPortValue)
  PORT: number;

  @IsString()
  @IsNotEmpty()
  JWT_SECRET: string;

  @Type(() => Number)
  @IsNumber()
  JWT_EXPIRES_IN: string;

  // DB
  @IsUrl({ require_tld: false })
  DB_HOST: string;

  @Type(() => Number)
  @IsNumber()
  @Min(MinPortValue)
  @Max(MaxPortValue)
  DB_PORT: number;

  @IsString()
  @IsNotEmpty()
  DB_USERNAME: string;

  @IsString()
  @IsNotEmpty()
  DB_PASSWORD: string;

  @IsString()
  @IsNotEmpty()
  DB_NAME: string;
}

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { randEmail, randPassword, randPhoneNumber } from '@ngneat/falso';
import {
  IsEmail,
  IsMobilePhone,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

/**
 * @description `email` or `mobilePhone` is required but not both
 */
export class SignInDto {
  @ApiProperty({ example: randPassword() })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiPropertyOptional({ example: randEmail() })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ example: randPhoneNumber() })
  @IsOptional()
  @IsMobilePhone()
  mobilePhone?: string;
}

import { Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsMobilePhone,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;

  @IsString()
  @IsNotEmpty()
  fullName: string;

  @Type(() => Date)
  @IsDate()
  birthday: Date;

  @IsMobilePhone()
  mobilePhone: string;
}

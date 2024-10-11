import { ApiProperty } from '@nestjs/swagger';
import {
  randEmail,
  randFullName,
  randPassword,
  randPastDate,
  randPhoneNumber,
} from '@ngneat/falso';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsMobilePhone,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MaxDate,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: randEmail() })
  @IsEmail()
  email: string;

  @ApiProperty({ example: randPassword() })
  @IsStrongPassword()
  password: string;

  @ApiProperty({ example: randFullName() })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({ example: randPastDate() })
  @Type(() => Date)
  @IsDate()
  @MaxDate(() => new Date(), {
    message: `birthday must be in the past`,
  })
  birthday: Date;

  @ApiProperty({ example: randPhoneNumber() })
  @IsMobilePhone()
  mobilePhone: string;
}

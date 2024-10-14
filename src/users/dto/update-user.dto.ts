import { ApiPropertyOptional } from '@nestjs/swagger';
import { randFullName, randPastDate } from '@ngneat/falso';
import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsDate,
  MaxDate,
  IsOptional,
} from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional({ example: randFullName() })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  fullName?: string;

  @ApiPropertyOptional({ example: randPastDate() })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  @MaxDate(() => new Date(), {
    message: `birthday must be in the past`,
  })
  birthday?: Date;
}

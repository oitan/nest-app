import { ApiResponseProperty } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

export class UserResponse {
  @ApiResponseProperty()
  id: number;

  @ApiResponseProperty()
  email: string;

  @ApiResponseProperty()
  fullName: string;

  @ApiResponseProperty()
  birthday: Date;

  @ApiResponseProperty()
  mobilePhone: string;

  constructor(user: User) {
    this.email = user.email;
    this.birthday = user.birthday;
    this.fullName = user.fullName;
    this.mobilePhone = user.mobilePhone;
  }
}

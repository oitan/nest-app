import { User } from '../entities/user.entity';

export class UserResponse {
  id: number;
  email: string;
  fullName: string;
  birthday: Date;
  mobilePhone: string;

  constructor(user: User) {
    this.email = user.email;
    this.birthday = user.birthday;
    this.fullName = user.fullName;
    this.mobilePhone = user.mobilePhone;
  }
}

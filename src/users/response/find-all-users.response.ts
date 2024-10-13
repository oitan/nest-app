import { User } from '../entities/user.entity';
import { UserResponse } from './user.response';

export class FindAllUsersResponse {
  users: UserResponse[];

  constructor(users: User[]) {
    this.users = users.map((user) => new UserResponse(user));
  }
}

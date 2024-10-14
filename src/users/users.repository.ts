import { DataSource, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Injectable } from '@nestjs/common';
import { UserAlreadyExistsError, UserNotFoundError } from 'src/core/errors';

@Injectable()
export class UsersRepository extends Repository<User> {
  constructor(private readonly _dataSource: DataSource) {
    super(User, _dataSource.createEntityManager());
  }

  async validateIsUnique({
    email,
    mobilePhone,
  }: {
    email: string;
    mobilePhone: string;
  }): Promise<void> {
    const exists = await this.existsBy([{ email }, { mobilePhone }]);

    if (exists) {
      throw new UserAlreadyExistsError(
        `User with ${email} email or ${mobilePhone} mobile phone already exists`,
      );
    }
  }

  async validateDoesExist(id: number): Promise<void> {
    const doesExist = await this.existsBy({ id });
    if (!doesExist) {
      throw new UserNotFoundError(`User with ID ${id} does not exist`);
    }
  }
}

import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';
import { User } from './entities/user.entity';
import { UserNotFoundError } from 'src/core/errors';

@Injectable()
export class UsersService {
  private readonly _logger = new Logger(UsersService.name);
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    await this.usersRepository.validateIsUnique(createUserDto);
    const user = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new UserNotFoundError(`User with ID ${id} does not exist`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    await this.usersRepository.validateDoesExist(id);
    return this.usersRepository.save({
      ...updateUserDto,
      id,
    });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.validateDoesExist(id);
    await this.usersRepository.softRemove({ id });
  }
}

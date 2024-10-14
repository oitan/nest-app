import { Injectable, Logger } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';
import { User } from './entities/user.entity';
import { UserNotFoundError } from 'src/core/errors';
import { SignUpDto } from 'src/auth/dto';

@Injectable()
export class UsersService {
  private readonly _logger = new Logger(UsersService.name);
  constructor(private readonly usersRepository: UsersRepository) {}

  async findByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ email });
    if (!user) {
      throw new UserNotFoundError('No user found with such an email');
    }
    return user;
  }

  async findByMobilePhone(mobilePhone: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ mobilePhone });
    if (!user) {
      throw new UserNotFoundError('No user found with such a mobile phone');
    }
    return user;
  }

  async create(
    signUpDto: SignUpDto & { passwordSalt: string; hashedPassword: string },
  ): Promise<User> {
    await this.usersRepository.validateIsUnique(signUpDto);
    const user = this.usersRepository.create(signUpDto);
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

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Logger,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';
import { handleEndpointErrors } from 'src/core/endpoint-error-handler';
import { UserAlreadyExistsError, UserNotFoundError } from 'src/core/errors';
import { CreateUserDto, UpdateUserDto } from './dto';
import {
  CreateUserResponse,
  FindAllUsersResponse,
  FindOneUserResponse,
  UpdateUserResponse,
} from './response';

@ApiTags('users')
@Controller('users')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<CreateUserResponse> {
    try {
      const user = await this.usersService.create(createUserDto);
      return new CreateUserResponse(user);
    } catch (error) {
      return handleEndpointErrors(this.logger, error, [
        { errorTypes: [UserAlreadyExistsError], toThrow: BadRequestException },
      ]);
    }
  }

  @Get()
  async findAll(): Promise<FindAllUsersResponse> {
    try {
      const users = await this.usersService.findAll();
      return new FindAllUsersResponse(users);
    } catch (error) {
      return handleEndpointErrors(this.logger, error, [
        { errorTypes: [UserAlreadyExistsError], toThrow: BadRequestException },
      ]);
    }
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<FindOneUserResponse> {
    try {
      const user = await this.usersService.findOne(id);
      return new FindOneUserResponse(user);
    } catch (error) {
      return handleEndpointErrors(this.logger, error, [
        { errorTypes: [UserNotFoundError], toThrow: NotFoundException },
      ]);
    }
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UpdateUserResponse> {
    try {
      const user = await this.usersService.update(id, updateUserDto);
      return new UpdateUserResponse(user);
    } catch (error) {
      return handleEndpointErrors(this.logger, error, [
        { errorTypes: [UserNotFoundError], toThrow: NotFoundException },
      ]);
    }
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    try {
      await this.usersService.remove(id);
    } catch (error) {
      handleEndpointErrors(this.logger, error, [
        { errorTypes: [UserNotFoundError], toThrow: NotFoundException },
      ]);
    }
  }
}

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
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { handleEndpointErrors } from 'src/core/endpoint-error-handler';
import { CreateUserResponse } from './response/create-user.response';
import { UserAlreadyExistsError } from 'src/core/errors';

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
      return handleEndpointErrors<CreateUserResponse>(this.logger, error, [
        { errorTypes: [UserAlreadyExistsError], toThrow: BadRequestException },
      ]);
    }
  }

  @Get()
  findAll() {
    try {
      return this.usersService.findAll();
    } catch (error) {
      handleEndpointErrors(this.logger, error, []);
    }
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      return this.usersService.findOne(id);
    } catch (error) {
      handleEndpointErrors(this.logger, error, []);
    }
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      return this.usersService.update(id, updateUserDto);
    } catch (error) {
      handleEndpointErrors(this.logger, error, []);
    }
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    try {
      return this.usersService.remove(id);
    } catch (error) {
      handleEndpointErrors(this.logger, error, []);
    }
  }
}

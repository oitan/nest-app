import {
  Controller,
  Body,
  Patch,
  Param,
  ParseIntPipe,
  Logger,
  NotFoundException,
  UseGuards,
  Req,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';
import { handleEndpointErrors } from 'src/core/endpoint-error-handler';
import { UserNotFoundError } from 'src/core/errors';
import { UpdateUserDto } from './dto';
import { UpdateUserResponse } from './response';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';

@ApiTags('users')
@Controller('users')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req: Request,
  ): Promise<UpdateUserResponse> {
    try {
      if (!req.payload) {
        throw new UnauthorizedException();
      }
      if (req.payload.sub !== id) {
        throw new ForbiddenException();
      }
      const user = await this.usersService.update(id, updateUserDto);
      return new UpdateUserResponse(user);
    } catch (error) {
      return handleEndpointErrors(this.logger, error, [
        { errorTypes: [UserNotFoundError], toThrow: NotFoundException },
      ]);
    }
  }
}

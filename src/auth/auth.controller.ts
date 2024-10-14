import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Logger,
  NotFoundException,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './dto';
import { GetAuthResponse, SignInResponse, SignUpResponse } from './response';
import {
  InvalidSignInDataError,
  UserAlreadyExistsError,
  UserNotFoundError,
} from 'src/core/errors';
import { handleEndpointErrors } from 'src/core/endpoint-error-handler';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { AuthGuard } from './auth.guard';
import { WrongCredentialsError } from 'src/core/errors/wrong-credentials.error';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async signIn(@Body() signInDto: SignInDto): Promise<SignInResponse> {
    try {
      const { accessToken } = await this.authService.signIn(signInDto);
      return new SignInResponse({ accessToken });
    } catch (error) {
      return handleEndpointErrors(this.logger, error, [
        {
          errorTypes: [UserNotFoundError],
          toThrow: NotFoundException,
        },
        {
          errorTypes: [InvalidSignInDataError, WrongCredentialsError],
          toThrow: BadRequestException,
        },
      ]);
    }
  }

  @Post('signup')
  async signUp(@Body() signUpDto: SignUpDto): Promise<SignUpResponse> {
    try {
      const user = await this.authService.signUp(signUpDto);
      return new SignUpResponse(user);
    } catch (error) {
      return handleEndpointErrors(this.logger, error, [
        { errorTypes: [UserAlreadyExistsError], toThrow: BadRequestException },
      ]);
    }
  }

  @UseGuards(AuthGuard)
  @Get()
  async getAuth(@Req() req: Request) {
    try {
      if (!req.payload) {
        throw new UnauthorizedException();
      }
      return new GetAuthResponse(req.payload);
    } catch (error) {
      return handleEndpointErrors(this.logger, error, []);
    }
  }
}

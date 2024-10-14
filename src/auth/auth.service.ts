import { Injectable, Logger } from '@nestjs/common';
import { SignInDto, SignUpDto } from './dto';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import {
  InvalidSignInDataError,
  UnexpectedSituationError,
  UserNotFoundError,
} from 'src/core/errors';
import { WrongCredentialsError } from 'src/core/errors/wrong-credentials.error';
import { JwtService } from '@nestjs/jwt';
import { AppConfigService } from 'src/config/app-config.service';
import { pbkdf2Sync, randomBytes } from 'crypto';
import { JwtSignPayload } from './type/jwt-sign-payload.type';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: AppConfigService,
  ) {}

  async signIn(signInDto: SignInDto): Promise<{ accessToken: string }> {
    let user: User;
    try {
      user = await this.findUserSigningIn(signInDto);
    } catch (error) {
      this.logger.error(error);
      if (error instanceof UserNotFoundError) {
        throw new WrongCredentialsError();
      } else {
        throw error;
      }
    }
    const hashedPassword = this.hashPassword(
      signInDto.password,
      user.passwordSalt,
    );
    if (user?.hashedPassword !== hashedPassword) {
      throw new WrongCredentialsError();
    }

    const payload: JwtSignPayload = { sub: user.id };
    return { accessToken: await this.jwtService.signAsync(payload) };
  }

  singOut() {}

  signUp(signUpDto: SignUpDto): Promise<User> {
    const passwordSalt = this.generatePasswordSalt();
    const hashedPassword = this.hashPassword(signUpDto.password, passwordSalt);
    return this.usersService.create({
      ...signUpDto,
      passwordSalt,
      hashedPassword,
    });
  }

  private validateSignInDto({ email, mobilePhone }: SignInDto) {
    if (email && mobilePhone) {
      throw new InvalidSignInDataError(
        'Only one of email and mobile phone must be supplied, not both',
      );
    }
    if (!email && !mobilePhone) {
      throw new InvalidSignInDataError(
        'Email or mobile phone must be specified',
      );
    }
  }

  private generatePasswordSalt(): string {
    return randomBytes(16).toString('hex');
  }

  private hashPassword(password: string, salt: string): string {
    return pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`);
  }

  private async findUserSigningIn(signInDto: SignInDto): Promise<User> {
    this.validateSignInDto(signInDto);

    if (signInDto.email) {
      return this.usersService.findByEmail(signInDto.email);
    }
    if (signInDto.mobilePhone) {
      return this.usersService.findByMobilePhone(signInDto.mobilePhone);
    }

    throw new UnexpectedSituationError('Both email and mobile phone are empty');
  }
}

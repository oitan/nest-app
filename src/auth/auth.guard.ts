import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { AppConfigService } from 'src/config/app-config.service';
import { AUTHORIZATION_HEADER } from 'src/core/headers.const';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger(AuthGuard.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: AppConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    const token = this.extractToken(req);
    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      req.payload = await this.jwtService.verifyAsync<JwtPayload>(token, {
        secret: this.configService.api.jwtSecret,
      });
    } catch (error: any) {
      this.logger.error(error);
      if (error.message === 'jwt expired') {
        throw new UnauthorizedException('Session is expired');
      }
      throw new UnauthorizedException('Session token is corrupted');
    }
    return true;
  }

  private extractToken(req: Request): string | undefined {
    const [type, token] = req.headers[AUTHORIZATION_HEADER]?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}

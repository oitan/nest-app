import { ApiResponseProperty } from '@nestjs/swagger';
import { JwtPayload } from 'jsonwebtoken';

export class GetAuthResponse {
  @ApiResponseProperty()
  sub: number;

  @ApiResponseProperty()
  exp: number;

  @ApiResponseProperty()
  iat: number;

  constructor(payload: JwtPayload) {
    this.sub = payload.sub;
    this.exp = payload.exp;
    this.iat = payload.iat;
  }
}

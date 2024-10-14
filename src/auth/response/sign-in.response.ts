import { ApiResponseProperty } from '@nestjs/swagger';

export class SignInResponse {
  @ApiResponseProperty()
  accessToken: string;

  constructor({ accessToken }: { accessToken: string }) {
    this.accessToken = accessToken;
  }
}

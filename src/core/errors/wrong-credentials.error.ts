import { BaseError } from 'src/core/base.error';

export class WrongCredentialsError extends BaseError {
  constructor(message?: string) {
    super(message ?? 'Wrong credentials');
  }
}

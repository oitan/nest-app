import { BaseError } from 'src/core/base.error';

export class UserAlreadyExistsError extends BaseError {
  constructor(message?: string) {
    super(message ?? 'User already exists');
  }
}

import { BaseError } from '../base.error';

export class InvalidSignInDataError extends BaseError {
  constructor(message?: string) {
    super(message ?? 'Invalid sign in data');
  }
}

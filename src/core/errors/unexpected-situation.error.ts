import { BaseError } from '../base.error';

export class UnexpectedSituationError extends BaseError {
  constructor(message?: string) {
    super(
      message ?? 'This situation should have never happen, but yet here we are',
    );
  }
}

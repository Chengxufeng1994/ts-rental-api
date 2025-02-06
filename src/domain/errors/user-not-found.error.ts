import { ApplicationError } from '../../infrastructure/core/application-error';

export class UserNotFoundError extends ApplicationError {
  constructor(userId: string) {
    super(`User with ID ${userId} was not found.`);
  }
}

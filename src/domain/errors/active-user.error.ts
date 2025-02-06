import { ApplicationError } from '../../infrastructure/core/application-error';

export class ActiveUserError extends ApplicationError {
  constructor() {
    super('User is not active');
  }
}

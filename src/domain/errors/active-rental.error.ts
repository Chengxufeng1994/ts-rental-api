import { ApplicationError } from '../../infrastructure/core/application-error';

export class ActiveRentalError extends ApplicationError {
  constructor() {
    super('User already has an active rental.');
  }
}

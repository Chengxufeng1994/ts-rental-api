import { ApplicationError } from '../../infrastructure/core/application-error';

export class ScooterNotFoundError extends ApplicationError {
  constructor(scooterId: string) {
    super(`Scooter with ID ${scooterId} was not found.`);
  }
}

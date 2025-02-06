import { Scooter } from '../aggregate/scooter.aggregate';

export interface ScooterRepository {
  save(scooter: Scooter): Promise<void>;

  findById(id: string): Promise<Scooter | null>;
}

export const ScooterRepository = Symbol('ScooterRepository');

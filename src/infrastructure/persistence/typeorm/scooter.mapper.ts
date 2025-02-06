import { Scooter } from '../../../domain/aggregate/scooter.aggregate';
import { ScooterStatus } from '../../../domain/valueobject/scooter.status.vo';

import { Scooter as ScooterEntity } from './entity/scooter.entity';

export class ScooterMapper {
  static toDomain(scooter: ScooterEntity): Scooter {
    return Scooter.hydrate(
      scooter.id,
      this.toScooterStatus(scooter.status),
      scooter.battery,
    );
  }
  static toPersistence(scooter: Scooter): ScooterEntity {
    const entity = new ScooterEntity();
    entity.id = scooter.id;
    entity.status = scooter.status;
    entity.battery = scooter.battery.value;
    return entity;
  }

  private static toScooterStatus(status: string): ScooterStatus {
    switch (status) {
      case 'AVAILABLE':
        return ScooterStatus.Available;
      case 'RENTED':
        return ScooterStatus.Rented;
      case 'MAINTENANCE':
        return ScooterStatus.Maintenance;
      default:
        return ScooterStatus.Available;
    }
  }
}

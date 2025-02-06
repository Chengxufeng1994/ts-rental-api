import { Battery } from '../valueobject/battery.vo';
import { ScooterStatus } from '../valueobject/scooter.status.vo';

export class Scooter {
  constructor(
    public readonly id: string,
    public status: ScooterStatus = ScooterStatus.Available,
    public battery: Battery,
  ) {}

  public static hydrate(id: string, status: ScooterStatus, battery: number) {
    return new Scooter(id, status, new Battery(battery));
  }

  markAsRented() {
    if (this.status !== ScooterStatus.Available) {
      throw new Error('Scooter is not available');
    }
    this.status = ScooterStatus.Rented;
  }

  markAsAvailable() {
    if (this.status !== ScooterStatus.Rented) {
      throw new Error('Scooter is not rented');
    }
    this.status = ScooterStatus.Available;
  }

  markAsMaintenance() {
    if (this.status !== ScooterStatus.Available) {
      throw new Error('Scooter is not available');
    }
    this.status = ScooterStatus.Maintenance;
  }
}

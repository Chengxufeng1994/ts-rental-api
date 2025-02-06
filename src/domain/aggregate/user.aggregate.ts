import { Rent } from '../entity/rent.entity';
import { ActiveRentalError } from '../errors/active-rental.error';
import { ActiveUserError } from '../errors/active-user.error';
import { UserStatus } from '../valueobject/user-status.vo';

export class User {
  id: string;
  name: string;
  status: UserStatus;
  currentRent: Rent | null;
  rentHistory: Rent[];

  constructor(
    id: string,
    name: string,
    status: UserStatus,
    rent: Rent | null,
    rentHistory: Rent[],
  ) {
    this.id = id;
    this.name = name;
    this.status = status;
    this.currentRent = rent;
    this.rentHistory = rentHistory;
  }

  public static create(id: string, name: string) {
    return new User(id, name, UserStatus.Active, null, []);
  }

  public static hydrate(
    id: string,
    name: string,
    status: UserStatus,
    currentRent: Rent | null,
    rentHistory: Rent[],
  ) {
    return new User(id, name, status, currentRent, rentHistory);
  }

  getCurrentRent(): Rent {
    return this.currentRent!;
  }

  startRent(rent: Rent) {
    if (this.status !== UserStatus.Active) {
      throw new ActiveUserError();
    }
    if (this.currentRent) {
      throw new ActiveRentalError();
    }

    this.currentRent = rent;
  }

  completeRent() {
    if (this.status !== UserStatus.Active) {
      throw new ActiveUserError();
    }

    if (!this.currentRent) {
      throw new Error('User has no active rent');
    }

    if (!this.currentRent.isInProgress()) {
      throw new ActiveRentalError();
    }

    const rent = this.currentRent.complete();
    this.rentHistory.push(rent);
    this.currentRent = null;
  }

  isActive() {
    return this.status === UserStatus.Active;
  }

  isRenting(): boolean {
    return this.currentRent !== null;
  }

  markAsBanned() {
    if (this.status !== UserStatus.Active) {
      throw new Error('User is cannot be banned');
    }
    this.status = UserStatus.Banned;
  }
}

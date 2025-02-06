import { RentStatus } from '../valueobject/rent-status.vo';

export class Rent {
  id: string;
  scooterId: string;
  startTime: Date;
  endTime: Date | null;
  status: RentStatus;

  constructor(
    id: string,
    scooterId: string,
    startTime: Date,
    endTime: Date | null,
    status: RentStatus,
  ) {
    this.id = id;
    this.status = status;
    this.scooterId = scooterId;
    this.startTime = startTime;
    this.endTime = endTime;
  }

  public static create(id: string, scooterId: string) {
    return new Rent(id, scooterId, new Date(), null, RentStatus.InProgress);
  }

  public static hydrate(
    id: string,
    scooterId: string,
    startTime: Date,
    endTime: Date,
    status: RentStatus,
  ) {
    return new Rent(id, scooterId, startTime, endTime, status);
  }

  isInProgress(): boolean {
    return this.status === RentStatus.InProgress;
  }

  start(scooterId: string): void {
    this.scooterId = scooterId;
    this.status = RentStatus.InProgress;
    this.startTime = new Date();
  }

  complete(): Rent {
    if (this.status !== RentStatus.InProgress) {
      throw new Error('Rent is not in progress');
    }

    this.status = RentStatus.Completed;
    this.endTime = new Date();

    return this;
  }
}

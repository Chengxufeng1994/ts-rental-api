import { User as UserEntity } from './entity/user.entity';
import { Rent as RentEntity } from './entity/rent.entity';

import { User } from '../../../domain/aggregate/user.aggregate';
import { Rent } from '../../../domain/entity/rent.entity';
import { UserStatus } from '../../../domain/valueobject/user-status.vo';
import { RentStatus } from '../../../domain/valueobject/rent-status.vo';

export class UserMapper {
  static toDomain(userEntity: UserEntity): User {
    const currentRent = this.rentToDomain(userEntity.currentRent);
    const rentHistory = this.rentHistoryToDomain(userEntity.rentHistory);

    return User.hydrate(
      userEntity.id,
      userEntity.name,
      this.toUserStatus(userEntity.status),
      currentRent,
      rentHistory,
    );
  }

  static toPersistence(user: User): UserEntity {
    const userEntity = new UserEntity();
    userEntity.id = user.id;
    userEntity.name = user.name;
    userEntity.status = user.status;
    userEntity.currentRent = this.rentToPersistence(user.currentRent);
    userEntity.rentHistory = user.rentHistory
      .map((rent) => this.rentToPersistence(rent))
      .filter((rent): rent is RentEntity => rent !== null); // Type guard for null filter

    return userEntity;
  }

  private static rentToDomain(rentEntity: RentEntity | null): Rent | null {
    if (!rentEntity) {
      return null;
    }

    return Rent.hydrate(
      rentEntity.id,
      rentEntity.scooterId,
      rentEntity.startTime,
      rentEntity.endTime,
      this.toRentStatus(rentEntity.status),
    );
  }

  private static rentHistoryToDomain(rentHistory: RentEntity[]): Rent[] {
    return rentHistory
      .map((rent) => this.rentToDomain(rent))
      .filter((rent) => rent !== null);
  }

  private static rentToPersistence(rent: Rent | null): RentEntity | null {
    if (!rent) {
      return null;
    }

    const rentEntity = new RentEntity();
    rentEntity.id = rent.id;
    rentEntity.status = rent.status;
    rentEntity.scooterId = rent.scooterId;
    rentEntity.startTime = rent.startTime;
    if (rent.endTime) {
      rentEntity.endTime = rent.endTime;
    }
    return rentEntity;
  }

  private static rentHistoryToPersistence(rentHistory: Rent[]): RentEntity[] {
    return rentHistory
      .map((rent) => this.rentToPersistence(rent))
      .filter((rent) => rent !== null);
  }

  private static toUserStatus(status: string): UserStatus {
    switch (status) {
      case 'ACTIVE':
        return UserStatus.Active;
      case 'BANNED':
        return UserStatus.Banned;
      default:
        return UserStatus.Active; // Default to Active status
    }
  }

  private static toRentStatus(status: string): RentStatus {
    switch (status) {
      case 'IN_PROGRESS':
        return RentStatus.InProgress;
      case 'COMPLETED':
        return RentStatus.Completed;
      default:
        return RentStatus.Unknown; // Default to Unknown status
    }
  }
}

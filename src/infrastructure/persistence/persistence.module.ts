import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './typeorm/entity/user.entity';
import { Rent } from './typeorm/entity/rent.entity';
import { Scooter } from './typeorm/entity/scooter.entity';
import { PostgresUserRepository } from './typeorm/user.repository';
import { PostgresScooterRepository } from './typeorm/scooter.repository';

import { UserRepository } from '../../domain/repository/user.repository';
import { ScooterRepository } from '../../domain/repository/scooter.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User, Rent, Scooter])],
  providers: [
    {
      provide: UserRepository,
      useClass: PostgresUserRepository,
    },
    {
      provide: ScooterRepository,
      useClass: PostgresScooterRepository,
    },
  ],
  exports: [UserRepository, ScooterRepository, TypeOrmModule],
})
export class PersistenceModule {}

import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User as UserEntity } from './entity/user.entity';
import { UserMapper } from './user.mapper';

import { UserRepository } from '../../../domain/repository/user.repository';
import { User as UserAggregate } from '../../../domain/aggregate/user.aggregate';

@Injectable()
export class PostgresUserRepository implements UserRepository {
  private logger = new Logger(PostgresUserRepository.name);
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}

  async save(user: UserAggregate): Promise<void> {
    const userEntity = UserMapper.toPersistence(user);
    await this.repository.save(userEntity);
  }

  async findById(id: string): Promise<UserAggregate | null> {
    try {
      const user = await this.repository.findOne({
        where: { id },
        relations: { currentRent: true, rentHistory: true },
      });

      if (!user) {
        return null;
      }

      return UserMapper.toDomain(user);
    } catch (error) {
      this.logger.error(error);
      return null;
    }
  }
}

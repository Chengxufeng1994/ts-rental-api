import { v7 as uuid } from 'uuid';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserStatus } from '../domain/valueobject/user-status.vo';
import { User } from '../infrastructure/persistence/typeorm/entity/user.entity';

@Injectable()
export class UserSeeder {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async seed() {
    console.log('🔥 User seeding started...');
    const user = new User();
    user.id = uuid();
    user.name = 'John Doe';
    user.status = UserStatus.Active;
    await this.repository.save(user);
    console.log('✅ User seeding completed!');
  }
}

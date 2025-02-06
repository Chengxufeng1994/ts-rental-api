import { v7 as uuid } from 'uuid';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ScooterStatus } from '../domain/valueobject/scooter.status.vo';
import { Scooter } from '../infrastructure/persistence/typeorm/entity/scooter.entity';

@Injectable()
export class ScooterSeeder {
  constructor(
    @InjectRepository(Scooter)
    private readonly repository: Repository<Scooter>,
  ) {}

  async seed() {
    console.log('🔥 Scooter seeding started...');
    for (let i = 0; i < 3; i++) {
      const scooter = new Scooter();
      scooter.id = uuid();
      scooter.status = ScooterStatus.Available;
      scooter.battery = 100;
      await this.repository.save(scooter);
    }
    console.log('✅ Scooter seeding completed!');
  }
}

import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ScooterRepository } from '../../../domain/repository/scooter.repository';
import { Scooter } from '../../../domain/aggregate/scooter.aggregate';

import { ScooterMapper } from './scooter.mapper';
import { Scooter as ScooterEntity } from './entity/scooter.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostgresScooterRepository implements ScooterRepository {
  private logger = new Logger(PostgresScooterRepository.name);
  constructor(
    @InjectRepository(ScooterEntity)
    private readonly repository: Repository<ScooterEntity>,
  ) {}

  async save(scooter: Scooter): Promise<void> {
    const scooterEntity = ScooterMapper.toPersistence(scooter);
    await this.repository.save(scooterEntity);
  }

  async findById(id: string): Promise<Scooter | null> {
    const scooterEntity = await this.repository.findOne({ where: { id } });
    if (!scooterEntity) {
      return null;
    }
    return ScooterMapper.toDomain(scooterEntity);
  }
}

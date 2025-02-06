import { Module } from '@nestjs/common';

import { InfrastructureModule } from '../infrastructure/infrastructure.module';

import { UserSeeder } from './user.seeder';
import { ScooterSeeder } from './scooter.seeder';

@Module({
  imports: [InfrastructureModule],
  providers: [UserSeeder, ScooterSeeder],
  exports: [UserSeeder, ScooterSeeder],
})
export class SeedModule {}

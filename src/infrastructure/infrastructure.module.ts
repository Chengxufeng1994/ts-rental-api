import { Module } from '@nestjs/common';

import { ConfigurationModule } from './config/configuration.module';
import { DatabaseModule } from './database/database.module';
import { PersistenceModule } from './persistence/persistence.module';

@Module({
  imports: [ConfigurationModule, DatabaseModule, PersistenceModule],
  exports: [PersistenceModule],
})
export class InfrastructureModule {}

import { Module } from '@nestjs/common';

import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { ApplicationModule } from './application/application.module';
import { InterfaceModule } from './interface/interface.module';

@Module({
  imports: [InfrastructureModule, ApplicationModule, InterfaceModule],
})
export class AppModule {}

import { Module } from '@nestjs/common';

import { ApplicationModule } from '../../application/application.module';

import { HelloController } from './hello.controller';
import { RentController } from './rent.controller';

@Module({
  imports: [ApplicationModule],
  controllers: [HelloController, RentController],
})
export class ControllersModule {}

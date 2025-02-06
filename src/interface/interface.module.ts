import { Module } from '@nestjs/common';

import { ControllersModule } from './controller/controllers.module';

@Module({
  imports: [ControllersModule],
})
export class InterfaceModule {}

import { Module } from '@nestjs/common';

import { IHelloApplication } from './service/interfaces/hello.service.interface';
import { HelloApplicationService } from './service/hello.service';
import { IRentApplication } from './service/interfaces/rent.service.interface';
import { RentApplicationService } from './service/rent.service';
import { UseCaseModule } from './usecase/usecase.module';

import { DomainModule } from '../domain/domain.module';

@Module({
  imports: [UseCaseModule, DomainModule],
  providers: [
    {
      provide: IHelloApplication,
      useClass: HelloApplicationService,
    },
    {
      provide: IRentApplication,
      useClass: RentApplicationService,
    },
  ],
  exports: [IHelloApplication, IRentApplication],
})
export class ApplicationModule {}

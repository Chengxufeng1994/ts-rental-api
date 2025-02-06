import { Module } from '@nestjs/common';

import { ISayHelloUseCase } from './hello/say-hello/say-hello.usecase';
import { SayHelloUseCaseImpl } from './hello/say-hello/say-hello.usecase.impl';

import { IStartRentUseCase } from './rent/start-rent/start-rent.usecase';
import { StartRentUseCaseImpl } from './rent/start-rent/start-rent.usecase.impl';
import { CompleteRentUseCaseImpl } from './rent/complete-rent/complete-rent.usecase.impl';
import { ICompleteRentUseCase } from './rent/complete-rent/complete-rent.usecase';

import { InfrastructureModule } from '../../infrastructure/infrastructure.module';

@Module({
  imports: [InfrastructureModule],
  providers: [
    {
      provide: ISayHelloUseCase,
      useClass: SayHelloUseCaseImpl,
    },
    {
      provide: IStartRentUseCase,
      useClass: StartRentUseCaseImpl,
    },
    {
      provide: ICompleteRentUseCase,
      useClass: CompleteRentUseCaseImpl,
    },
  ],
  exports: [ISayHelloUseCase, IStartRentUseCase, ICompleteRentUseCase],
})
export class UseCaseModule {}

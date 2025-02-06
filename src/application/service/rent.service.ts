import { Inject, Injectable } from '@nestjs/common';

import { IRentApplication } from './interfaces/rent.service.interface';
import { IStartRentUseCase } from '../usecase/rent/start-rent/start-rent.usecase';
import { ICompleteRentUseCase } from '../usecase/rent/complete-rent/complete-rent.usecase';

import { CompleteRentDto } from '../dto/complete-rent.dto';
import { StartRentDto } from '../dto/start-rent.dto';

@Injectable()
export class RentApplicationService implements IRentApplication {
  constructor(
    @Inject(IStartRentUseCase)
    private readonly startRentUseCase: IStartRentUseCase,
    @Inject(ICompleteRentUseCase)
    private readonly completeRentUseCase: ICompleteRentUseCase,
  ) {}

  async startRent(startRentDto: StartRentDto): Promise<void> {
    await this.startRentUseCase.execute(startRentDto);
  }

  async completeRent(completeRentDto: CompleteRentDto): Promise<void> {
    await this.completeRentUseCase.execute(completeRentDto);
  }
}

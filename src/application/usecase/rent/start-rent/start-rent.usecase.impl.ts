import { v7 as uuidv7 } from 'uuid';

import { Inject, Injectable, Logger } from '@nestjs/common';

import { IStartRentUseCase } from './start-rent.usecase';
import { StartRentDto } from '../../../dto/start-rent.dto';
import { Rent } from '../../../../domain/entity/rent.entity';

import { UserRepository } from '../../../../domain/repository/user.repository';
import { ScooterRepository } from '../../../../domain/repository/scooter.repository';

import { UserNotFoundError } from '../../../../domain/errors/user-not-found.error';
import { ScooterNotFoundError } from 'src/domain/errors/scooter-not-found.error';

@Injectable()
export class StartRentUseCaseImpl implements IStartRentUseCase {
  private logger = new Logger(StartRentUseCaseImpl.name);

  constructor(
    @Inject(UserRepository)
    private readonly userRepository: UserRepository,
    @Inject(ScooterRepository)
    private readonly scooterRepository: ScooterRepository,
  ) {}

  async execute(startRentDto: StartRentDto): Promise<void> {
    this.logger.log(`>>> Start Rent Start for user ${startRentDto.userId}`);

    const user = await this.userRepository.findById(startRentDto.userId);
    if (!user) {
      throw new UserNotFoundError(startRentDto.userId);
    }

    const scooter = await this.scooterRepository.findById(
      startRentDto.scooterId,
    );
    if (!scooter) {
      throw new ScooterNotFoundError(startRentDto.scooterId);
    }

    scooter.markAsRented();

    const rent = Rent.create(uuidv7(), startRentDto.scooterId);
    user.startRent(rent);

    await this.userRepository.save(user);
    await this.scooterRepository.save(scooter);
    this.logger.log(`>>> Start Rent Success for user ${startRentDto.userId}`);
  }
}

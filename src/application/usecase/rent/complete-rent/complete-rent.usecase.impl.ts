import { Inject, Injectable, Logger } from '@nestjs/common';

import { ICompleteRentUseCase } from './complete-rent.usecase';
import { CompleteRentDto } from '../../../dto/complete-rent.dto';
import { UserNotFoundError } from '../../../../domain/errors/user-not-found.error';
import { UserRepository } from '../../../../domain/repository/user.repository';
import { ScooterRepository } from '../../../../domain/repository/scooter.repository';
import { ScooterNotFoundError } from 'src/domain/errors/scooter-not-found.error';

@Injectable()
export class CompleteRentUseCaseImpl implements ICompleteRentUseCase {
  private logger = new Logger(CompleteRentUseCaseImpl.name);

  constructor(
    @Inject(UserRepository)
    private readonly userRepository: UserRepository,
    @Inject(ScooterRepository)
    private readonly scooterRepository: ScooterRepository,
  ) {}

  async execute(completeRentDto: CompleteRentDto): Promise<void> {
    this.logger.log(
      `>>> Complete Rent Start for user ${completeRentDto.userId}`,
    );

    const user = await this.userRepository.findById(completeRentDto.userId);
    if (!user) {
      throw new UserNotFoundError(completeRentDto.userId);
    }

    if (!user.isRenting()) {
      throw new Error('User has no active rent');
    }

    const currentRent = user.getCurrentRent();
    const scooter = await this.scooterRepository.findById(
      currentRent.scooterId,
    );
    if (!scooter) {
      throw new ScooterNotFoundError(currentRent.scooterId);
    }

    user.completeRent();
    scooter.markAsAvailable();

    await this.userRepository.save(user);
    await this.scooterRepository.save(scooter);
    this.logger.log(
      `>>> Complete Rent Success for user ${completeRentDto.userId}`,
    );
  }
}

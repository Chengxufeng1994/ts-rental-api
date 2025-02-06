import { CompleteRentDto } from '../../../dto/complete-rent.dto';

export interface ICompleteRentUseCase {
  execute(completeRentDto: CompleteRentDto): Promise<void>;
}

export const ICompleteRentUseCase = Symbol('ICompleteRentUseCase');

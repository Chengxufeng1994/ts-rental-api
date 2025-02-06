import { StartRentDto } from '../../..//dto/start-rent.dto';

export interface IStartRentUseCase {
  execute(startRentDto: StartRentDto): Promise<void>;
}

export const IStartRentUseCase = Symbol('IStartRentUseCase');

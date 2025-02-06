import { CompleteRentDto } from '../../dto/complete-rent.dto';
import { StartRentDto } from '../../dto/start-rent.dto';

export interface IRentApplication {
  startRent(startRentDto: StartRentDto): Promise<void>;
  completeRent(completeRentDto: CompleteRentDto): Promise<void>;
}

export const IRentApplication = Symbol('IRentApplication');

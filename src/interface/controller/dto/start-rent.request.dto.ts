import { IsString, IsNotEmpty } from 'class-validator';

export class StartRentRequestDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  scooterId: string;
}

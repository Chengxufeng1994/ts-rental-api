export class StartRentDto {
  constructor(
    public readonly userId: string,
    public readonly scooterId: string,
  ) {}
}

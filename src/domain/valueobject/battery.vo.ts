export class Battery {
  constructor(public readonly value: number) {}

  public static create(value: number) {
    if (value < 0 || value > 100) {
      throw new Error('Battery must be between 0 and 100');
    }
    return new Battery(value);
  }
}

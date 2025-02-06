import { Injectable } from '@nestjs/common';
import { SayHelloUseCase } from './say-hello.usecase';

@Injectable()
export class SayHelloUseCaseImpl implements SayHelloUseCase {
  constructor() {}
  execute(): string {
    return 'Hello World!';
  }
}

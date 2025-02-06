import { Inject, Injectable } from '@nestjs/common';

import { IHelloApplication } from './interfaces/hello.service.interface';
import {
  ISayHelloUseCase,
  SayHelloUseCase,
} from '../usecase/hello/say-hello/say-hello.usecase';

@Injectable()
export class HelloApplicationService implements IHelloApplication {
  constructor(
    @Inject(ISayHelloUseCase)
    private readonly sayHelloUseCase: SayHelloUseCase,
  ) {}

  sayHello(): string {
    return this.sayHelloUseCase.execute();
  }
}

import { Controller, Get, Inject } from '@nestjs/common';

import { IHelloApplication } from '../../application/service/interfaces/hello.service.interface';
import { HelloApplicationService } from '../../application/service/hello.service';

@Controller()
export class HelloController {
  constructor(
    @Inject(IHelloApplication)
    private readonly appService: HelloApplicationService,
  ) {}

  @Get()
  hello(): string {
    return this.appService.sayHello();
  }
}

import { Test, TestingModule } from '@nestjs/testing';
import { HelloController } from './hello.controller';
import { HelloApplicationService } from '../../application/service/hello.service';

describe('AppController', () => {
  let appController: HelloController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [HelloController],
      providers: [HelloApplicationService],
    }).compile();

    appController = app.get<HelloController>(HelloController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.hello()).toBe('Hello World!');
    });
  });
});

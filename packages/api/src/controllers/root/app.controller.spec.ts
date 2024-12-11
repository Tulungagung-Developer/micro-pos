import { Test, TestingModule } from '@nestjs/testing';
import { RootController } from '@ctrl/root/root.controller';
import { RootService } from '@ctrl/root/root.service';

describe('RootController', () => {
  let root: RootController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [RootController],
      providers: [RootService],
    }).compile();

    root = app.get<RootController>(RootController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(root.getHello()).toBe('Hello World!');
    });
  });
});

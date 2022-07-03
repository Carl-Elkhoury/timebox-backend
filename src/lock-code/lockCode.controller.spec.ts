import { Test, TestingModule } from '@nestjs/testing';
import { LockCodeController } from './lockCode.controller';

describe('LockCodeController', () => {
  let controller: LockCodeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LockCodeController],
    }).compile();

    controller = module.get<LockCodeController>(LockCodeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

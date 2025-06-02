import { Test, TestingModule } from '@nestjs/testing';
import { ClarityGatewayController } from './clarity-gateway.controller';
import { ClarityGatewayService } from './clarity-gateway.service';

describe('ClarityGatewayController', () => {
  let clarityGatewayController: ClarityGatewayController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ClarityGatewayController],
      providers: [ClarityGatewayService],
    }).compile();

    clarityGatewayController = app.get<ClarityGatewayController>(ClarityGatewayController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(clarityGatewayController.getHello()).toBe('Hello World!');
    });
  });
});

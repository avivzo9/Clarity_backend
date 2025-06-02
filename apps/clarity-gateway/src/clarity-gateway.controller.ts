import { Controller, Get } from '@nestjs/common';
import { ClarityGatewayService } from './clarity-gateway.service';

@Controller()
export class ClarityGatewayController {
  constructor(private readonly clarityGatewayService: ClarityGatewayService) {}

  @Get()
  getHello(): string {
    return this.clarityGatewayService.getHello();
  }
}

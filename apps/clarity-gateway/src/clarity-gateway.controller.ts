import { Controller, Post, Body } from '@nestjs/common';
import { ClarityGatewayService } from './clarity-gateway.service';
import { CreateUserDto } from '@app/contracts/users/dtos/create-user.dto';

@Controller('auth')
export class ClarityGatewayController {
  constructor(
    private readonly clarityGatewayService: ClarityGatewayService,
  ) { }

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    return this.clarityGatewayService.signup(createUserDto);
  }
}

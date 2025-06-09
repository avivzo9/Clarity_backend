import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { CreateUserDto } from '@app/contracts/users/dtos/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) { }

  @MessagePattern('signup')
  async signup(@Payload() data: CreateUserDto) {
    console.log('data:', data)
    return this.usersService.create(data);
  }
}

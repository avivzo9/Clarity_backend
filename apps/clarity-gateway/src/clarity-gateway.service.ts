import { CreateUserDto } from '@app/contracts/users/dtos/create-user.dto';
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class ClarityGatewayService {
  constructor(
    @Inject('USERS_SERVICE') private readonly userClient: ClientKafka,
  ) { }

  async onModuleInit() {
    this.userClient.subscribeToResponseOf('signup');
    await this.userClient.connect();
  }

  async signup(createUserDto: CreateUserDto) {
    return this.userClient.send('signup', createUserDto);
  }
}

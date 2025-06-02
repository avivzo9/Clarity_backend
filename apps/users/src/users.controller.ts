import { Body, Controller, Get, Session } from '@nestjs/common';
import { UsersService } from './users.service';
import { MessagePattern } from '@nestjs/microservices';
import { USERS_PATTERNS } from '@app/contracts/users/users.patterns';
import { CreateUserDto } from '@app/contracts/users/dtos/create-user.dto';
import { AuthService } from './auth.service';

@Controller()
export class UsersController {
  constructor(private usersSrv: UsersService, private authSrv: AuthService) { }

  @MessagePattern(USERS_PATTERNS.CREATE_USER)
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authSrv.signup(body);

    session.userId = user.id;
    return user;
  }
}

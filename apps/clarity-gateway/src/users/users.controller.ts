import { Controller, Inject, Post, Body, Get, Param, Put, Delete, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CreateUserDto } from '@app/contracts/users/dtos/create-user.dto';
import { firstValueFrom } from 'rxjs';

@Controller('users')
export class UsersController implements OnModuleInit {
    constructor(
        @Inject('USERS_SERVICE') private readonly usersClient: ClientKafka
    ) { }

    async onModuleInit() {
        this.usersClient.subscribeToResponseOf('signup');
        await this.usersClient.connect();
    }

    @Post('signup')
    async signup(@Body() createUserDto: CreateUserDto) {
        try {
            const response = await firstValueFrom(
                this.usersClient.send('signup', createUserDto)
            );
            return response;
        } catch (error) {
            throw error;
        }
    }
}
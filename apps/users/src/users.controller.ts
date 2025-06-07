import { Body, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, Patch, Post, Query, Session, UseGuards } from '@nestjs/common';
import { MessagePattern, Payload, Ctx, KafkaContext, ClientKafka } from '@nestjs/microservices';
import { CreateUserDto } from '@app/users';
import { UsersService } from '@app/users';
import { UpdateUserDto } from '@app/users';
import { UseSerialize } from '@app/interceptors';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';
import { CurrentUser } from '@app/users';
import { User } from '@app/users';
import { AuthGuard } from '@app/guards';
import { Signin } from './dtos/signin.dto';
import { AdminGuard } from '@app/guards';

@Controller('auth')
@UseSerialize(UserDto)
export class UsersController {

    constructor(private usersSrv: UsersService, private authSrv: AuthService, private kafkaClient: ClientKafka) {
        this.kafkaClient.subscribeToResponseOf('auth.signup.reply');
    }

    @MessagePattern('auth.signup')
    async handleSignup(@Payload() body: CreateUserDto) {
        return this.authSrv.signup(body.email, body.password);
    }

    @MessagePattern('auth.signin')
    async handleSignin(@Payload() body: Signin) {
        return this.authSrv.signin(body.email, body.password);
    }

    @MessagePattern('auth.currentuser')
    async handleCurrentUser(@Payload() data: any) {
        // This is a placeholder; in a real app, you'd extract user info from the payload or context
        return null;
    }

    @MessagePattern('auth.signout')
    async handleSignout(@Payload() data: any) {
        // This is a placeholder; in a real app, you'd handle session logic
        return true;
    }

    @Post('/signup')
    @HttpCode(HttpStatus.CREATED)
    async createUser(@Body() body: CreateUserDto, @Session() session: any) {
        const user = await this.authSrv.signup(body.email, body.password);
        session.userId = user.id;
        return user;
    }

    @Post('/signin')
    @HttpCode(HttpStatus.OK)
    async signin(@Body() body: Signin, @Session() session: any) {
        const user = await this.authSrv.signin(body.email, body.password);
        if (!user) throw new NotFoundException();
        session.userId = user.id;
        return user;
    }

    @Get('/currentuser')
    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    currentUser(@CurrentUser() user: User) {
        if (!user) throw new NotFoundException('User not found');

        return user;
    }

    @Post('/signout')
    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    signout(@Session() session: any) {
        if (!session || !session.userId) {
            throw new NotFoundException('User not signed in');
        }

        session.userId = null;
        return true;
    }

    @Get('/:id')
    @UseGuards(AdminGuard)
    async findUser(@Param('id') id: string) {
        const user = await this.usersSrv.findOne(Number(id));
        return user;
    }

    @Get()
    @UseGuards(AdminGuard)
    getAllUsers(@Query('email') email: string) {
        return this.usersSrv.find(email);
    }

    @Patch('/:id')
    @UseGuards(AdminGuard)
    updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
        return this.usersSrv.update(Number(id), body);
    }

    @Delete('/:id')
    @UseGuards(AdminGuard)
    removeUser(@Param('id') id: string) {
        return this.usersSrv.remove(Number(id));
    }
} 
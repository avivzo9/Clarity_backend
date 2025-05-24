import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query, Session, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UseSerialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from './user.entity';
import { AuthGaurd } from 'src/guards/auth.guard';
import { Signin } from './dtos/signin.dto';

@Controller('auth')
@UseSerialize(UserDto)
export class UsersController {

    constructor(private usersSrv: UsersService, private authSrv: AuthService) { }

    @Post('/signup')
    async createUser(@Body() body: CreateUserDto, @Session() session: any) {
        const user = await this.authSrv.signup(body);
        session.userId = user.id;
        return user;
    }

    @Post('/signin')
    async signin(@Body() body: Signin, @Session() session: any) {
        const user = await this.authSrv.signin(body);

        if (!user) throw new NotFoundException();

        session.userId = user.id;
        return user;
    }

    @Get('/currentuser')
    @UseGuards(AuthGaurd)
    currentUser(@CurrentUser() user: User) {
        return user;
    }

    @Post('/signout')
    signout(@Session() session: any) {
        session.userId = null;
        return true;
    }

    @Get(':id')
    @UseGuards(AuthGaurd)
    async getUserById(@Param('id') id: string) {
        const user = await this.usersSrv.findOne(parseInt(id));

        if (!user) throw new NotFoundException();

        return user;
    }

    @Get()
    @UseGuards(AuthGaurd)
    getAllUsers(@Query('email') email: string) {
        return this.usersSrv.find(email);
    }

    @Patch(':id')
    @UseGuards(AuthGaurd)
    updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
        return this.usersSrv.update(parseInt(id), body);
    }

    @Delete(':id')
    @UseGuards(AuthGaurd)
    removeUser(@Param('id') id: string) {
        return this.usersSrv.remove(parseInt(id));
    }
}
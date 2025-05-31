import { Body, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, Patch, Post, Query, Session, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UseSerialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from './user.entity';
import { AuthGuard } from 'src/guards/auth.guard';
import { Signin } from './dtos/signin.dto';
import { AdminGuard } from 'src/guards/admin.guard';

@Controller('auth')
@UseSerialize(UserDto)
export class UsersController {

    constructor(private usersSrv: UsersService, private authSrv: AuthService) { }

    @Post('/signup')
    @HttpCode(HttpStatus.CREATED)
    async createUser(@Body() body: CreateUserDto, @Session() session: any) {
        const user = await this.authSrv.signup(body);

        session.userId = user.id;
        return user;
    }

    @Post('/signin')
    @HttpCode(HttpStatus.OK)
    async signin(@Body() body: Signin, @Session() session: any) {
        const user = await this.authSrv.signin(body);

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

    @Get(':id')
    @UseGuards(AdminGuard)
    async getUserById(@Param('id') id: string) {
        const user = await this.usersSrv.findOne(id);

        if (!user) throw new NotFoundException();

        return user;
    }

    @Get()
    @UseGuards(AdminGuard)
    getAllUsers(@Query('email') email: string) {
        return this.usersSrv.find(email);
    }

    @Patch(':id')
    @UseGuards(AdminGuard)
    updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
        return this.usersSrv.update(id, body);
    }

    @Delete(':id')
    @UseGuards(AdminGuard)
    removeUser(@Param('id') id: string) {
        return this.usersSrv.remove(id);
    }
}
import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { UseSerialize } from 'src/interceptors/serialize.interceptor';
import { CategoryDto } from './dtos/category.dto';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';

@Controller('categories')
@UseGuards(AuthGuard)
export class CategoriesController {

    constructor(private readonly categoriesSrv: CategoriesService) { }

    @Get()
    getAll(@CurrentUser() user: User) {
        return this.categoriesSrv.findAll(user);
    }

    @Post()
    @UseSerialize(CategoryDto)
    create(@Body() body: CreateCategoryDto, @CurrentUser() user: User) {
        return this.categoriesSrv.create(body, user);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.categoriesSrv.remove(id);
    }
}